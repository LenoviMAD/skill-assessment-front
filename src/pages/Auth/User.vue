import { basename } from 'path';
<template>
  <section class="section row flex-column full-width">
    <header class="text-center col-md-12">
      <h3 class="q-my-sm">Usuarios</h3>
    </header>
    <div class="row flex-column full-width">
      <q-card
        v-for="(item, index) in dataUser"
        class="my-card q-mb-md"
        flat
        bordered
      >
        <q-card-section horizontal class="row">
          <q-card-section class="col-sm-10 col-md-10">
            Nombre: {{ item.name }} <br />
            Email: {{ item.email }}
          </q-card-section>

          <q-card-actions
            vertical
            class="justify-around q-px-md col-sm-2 col-md-2"
          >
            <q-btn
              v-if="item.ban == false"
              @click="onClickBan(item.id)"
              flat
              round
              color="red"
              icon="cancel"
            />
            <q-btn
              v-else
              @click="onClickUnban(item.id)"
              flat
              round
              color="green"
              icon="check_circle"
            />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </div>
  </section>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useSkillStore } from "../../stores/skillStore.ts";

export default {
  name: "login",
  setup() {
    const store = useSkillStore();
    const { getUsers, banUser, unbanUser } = store;
    const $q = useQuasar();
    const dataUser = reactive([]);
    const dataFavorite = reactive([]);
    const data = reactive({
      quote: "",
    });

    onMounted(async () => {
      const varUsers = await getUsers();

      const { ok, message } = varUsers;
      message.data.forEach(function (element: any) {
        dataUser.push({
          id: element.id,
          email: element.email,
          name: element.name,
          ban: element.ban,
        });
      });
    });

    return {
      onClickBan: async (idUser) => {
        const varBanUser = await banUser(idUser);
        console.log(idUser);
        const { ok, message } = varBanUser;

        if (ok == true) {
          $q.notify({
            message: message.message,
            color: "positive",
            icon: "check_circle",
          });

          const varUsers = await getUsers();
          dataUser.splice(0);
          const message2 = varUsers;
          message2.message.data.forEach(function (element: any) {
            dataUser.push({
              id: element.id,
              email: element.email,
              name: element.name,
              ban: element.ban,
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
      onClickUnban: async (idUser) => {
        console.log(idUser);

        const varUnbanUser = await unbanUser(idUser);
        const { ok, message } = varUnbanUser;
        console.log(message);

        if (ok == true) {
          $q.notify({
            message: message.message,
            color: "positive",
            icon: "check_circle",
          });
          const varUsers = await getUsers();
          dataUser.splice(0);
          const message2 = varUsers;
          message2.message.data.forEach(function (element: any) {
            dataUser.push({
              id: element.id,
              email: element.email,
              name: element.name,
              ban: element.ban,
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
      dataUser,
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
