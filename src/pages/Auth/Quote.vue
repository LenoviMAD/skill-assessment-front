<template>
  <section class="section row flex-column full-width">
    <header class="text-center col-md-12">
      <h3 class="q-my-sm">Citas</h3>
    </header>
    <div class="row flex-column full-width">
      <q-card
        v-for="(item, index) in dataQuote"
        class="my-card q-mb-md"
        flat
        bordered
      >
        <q-card-section horizontal class="row">
          <q-card-section class="col-sm-10 col-md-10">
            {{ item.quote }}
          </q-card-section>

          <q-card-actions
            vertical
            class="justify-around q-px-md col-sm-2 col-md-2"
          >
            <q-btn
              @click="onClickFavorite(item.quote)"
              flat
              round
              color="red"
              icon="favorite"
            />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </div>

    <div class="row flex-column text-center full-width">
      <div class="col-md-12">
        <h3 class="q-my-sm">Favoritos</h3>
      </div>

      <div class="row flex-column full-width">
        <q-card
          v-for="(item2, index) in dataFavorite"
          class="my-card q-mb-md"
          flat
          bordered
        >
          <q-card-section horizontal class="row">
            <q-card-section class="col-sm-10 col-md-10">
              {{ item2.description }}
            </q-card-section>

            <q-card-actions
              vertical
              class="justify-around q-px-md col-sm-2 col-md-2"
            >
              <q-btn
                @click="onClickDelete(item2.idFavorite)"
                flat
                round
                color="blue"
                icon="delete"
              />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSkillStore } from "../../stores/skillStore.ts";
import { useQuasar } from "quasar";

export default {
  name: "login",
  setup() {
    const store = useSkillStore();
    const { principalQuote, getFavorite, saveFavorite, deleteFavorite } = store;
    const dataQuote = reactive([]);
    const dataFavorite = reactive([]);
    const data = reactive({
      quote: "",
    });
    const $q = useQuasar();
    onMounted(async () => {
      const varQuote = await principalQuote();

      const { ok, message } = varQuote;
      message.data.forEach(function (element: any) {
        dataQuote.push({
          quote: element.quote,
        });
      });

      const varFavorite = await getFavorite();

      const respFavorite = varFavorite;
      respFavorite.message.data.forEach(function (element: any) {
        dataFavorite.push({
          idFavorite: element.id,
          description: element.description,
        });
      });
    });

    return {
      onClickFavorite: async (quote) => {
        const varFavorite = await saveFavorite(store.idUser, quote);
        const { ok, message } = varFavorite;

        if (ok == true) {
          $q.notify({
            message: message.message,
            color: "positive",
            icon: "check_circle",
          });
          dataFavorite.push({
            idFavorite: message.data.id,
            description: message.data.description,
          });

          const varQuote = await principalQuote();

          const message2 = varQuote;
          dataQuote.splice(0);
          message2.message.data.forEach(function (element: any) {
            dataQuote.push({
              quote: element.quote,
            });
          });
        } else {
          $q.notify({
            message: message.message != null ? message.message : message,
            color: "negative",
            icon: "error",
          });
        }
      },
      onClickDelete: async (id) => {
        console.log(id);

        const varDelete = await deleteFavorite(id);
        const { ok, message } = varDelete;
        console.log(message);

        if (ok == true) {
          $q.notify({
            message: message.message,
            color: "positive",
            icon: "check_circle",
          });

          const refFavorite = dataFavorite.filter((i) => i.idFavorite !== id);
          dataFavorite.splice(0);
          refFavorite.forEach((element) => {
            dataFavorite.push({
              idFavorite: element.id,
              description: element.description,
            });
          });
          const varQuote = await principalQuote();

          const message2 = varQuote;
          dataQuote.splice(0);
          message2.message.data.forEach(function (element: any) {
            dataQuote.push({
              quote: element.quote,
            });
          });
        } else {
          $q.notify({
            message: message.message != null ? message.message : message,
            color: "negative",
            icon: "error",
          });
        }
      },
      dataQuote,
      dataFavorite,
      onMounted,
    };
  },
};
</script>

<style lang="scss">
.custom-bg {
  background-image: url(~assets/top-view.jpg);

  background-size: cover;
}

.my-card {
  width: 100%;
  max-width: 350px;
}

.q-stepper__dot {
  font-size: 14px;
  width: 24px;
  min-width: 44px;
  height: 44px;
  border-radius: 50%;
  background: currentColor;
}
.q-stepper__dot span {
  font-size: 2em;
}

/* Color de la linea del stepper */
.q-stepper--horizontal .q-stepper__line:before,
.q-stepper--horizontal .q-stepper__line:after {
  background: #1566fc !important;
}

/* Estilos muy especificos para check */
.q-btn-group--push > .q-btn--push.q-btn--actionable {
  padding-left: 5px;
  border-radius: 2px;
  border: none;
  box-shadow: none;
  padding: 25px;
  width: 250px;
  flex-grow: 0;
}

.step-3-registry.q-btn-group {
  justify-content: space-evenly;
}
.my-special-class {
  background: #1e232d;
}
.div-tower {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.flex-column {
  display: flex;
  flex-direction: column;
  align-content: center;
}
.mb-20 {
  margin-bottom: 20px;
}
</style>
