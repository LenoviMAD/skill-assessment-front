<template>
  <q-page
    class="window-height window-width row justify-center items-center custom-bg"
  >
    <q-card square class="shadow-24" style="width: 350px; margin: 0 auto">
      <q-card-section class="custom-bg-primary">
        <h4 class="text-white q-my-sm q-mb-none">
          <q-btn
            flat
            icon="arrow_back"
            text-color="white"
            to="/"
            title="Atrás"
          />
          Iniciar sesión
        </h4>
      </q-card-section>
      <q-card-section class="q-pb-none">
        <q-form class="row q-col-gutter-sm" @submit.prevent="onSubmit">
          <q-input
            label="Email *"
            v-model="data.email"
            :rules="[(val) => !!val || 'Campo requerido']"
            class="col-sm-12 col-md-12"
            outlined
            dense
          />
          <q-input
            v-model="data.password"
            label="Contraseña *"
            :rules="[(val) => !!val || 'Campo requerido']"
            class="col-sm-12 col-md-12"
            :type="isPwd ? 'password' : 'text'"
            outlined
            dense
            ><template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              /> </template
          ></q-input>
          <q-btn
            text-color="white"
            class="full-width custom-bg-primary"
            icon-right="send"
            label="Iniciar sesión"
            type="submit"
          />
        </q-form>
      </q-card-section>
      <q-card-section class="text-center q-pa-sm">
        <router-link class="text-grey-6" to="/register">
          <p>¿Eres nuevo? Registrate</p>
        </router-link>
        <router-link class="text-grey-6" to="/">
          <p>Olvidé mi contraseña</p>
        </router-link>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import { useSkillStore } from "../../stores/skillStore.ts";

export default {
  name: "login",
  setup() {
    const store = useSkillStore();

    const { login } = store;
    const $q = useQuasar();

    const router = useRouter();
    const data = reactive({
      email: "",
      password: "",
    });
    return {
      data,
      isPwd: ref(true),
      onSubmit: async () => {
        const varLogin = await login(data.email, data.password);
        const { ok, message } = varLogin;
        console.log(message);

        if (message.data.ban == true) {
          $q.notify({
            message: "Has sido baneado, no puedes acceder",
            color: "warning",
            icon: "warning",
          });
          return;
        }
        if (ok == true) {
          $q.notify({
            message: message.message,
            color: "positive",
            icon: "check_circle",
          });
          router.push({ name: "quote" });
        } else {
          $q.notify({
            message: message.message != null ? message.message : message,
            color: "negative",
            icon: "error",
          });
        }
      },
    };
  },
};
</script>

<style lang="scss">
.custom-bg {
  background-image: url(assets/top-view.jpg);
  background-size: cover;
}
.custom-bg-primary {
  background-color: #1e232d;
}
</style>
