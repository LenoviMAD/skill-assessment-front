<template>
  <q-page
    class="window-height window-width row justify-center items-center custom-bg"
  >
    <q-card square class="shadow-24" style="width: 650px; margin: 0 auto">
      <q-card-section class="custom-bg-primary">
        <h4 class="text-white q-my-sm q-mb-none">
          <q-btn
            flat
            icon="arrow_back"
            text-color="white"
            to="/"
            title="Atrás"
          />
          Registro
        </h4>
      </q-card-section>
      <q-card-section class="q-pb-none q-mb-md">
        <q-form class="row q-col-gutter-sm" @submit.prevent="onSubmit">
          <q-input
            label="Email *"
            v-model="data.email"
            :rules="[(val) => !!val || 'Campo requerido']"
            class="col-sm-6 col-md-6"
            outlined
            dense
          />
          <q-input
            label="Nombre"
            v-model="data.name"
            :rules="[(val) => !!val || 'Campo requerido']"
            class="col-sm-6 col-md-6"
            outlined
            dense
          />
          <q-input
            label="Contraseña *"
            class="col-sm-6 col-md-6"
            :rules="[(val) => !!val || 'Campo requerido']"
            v-model="data.password"
            type="password"
            outlined
            dense
          />
          <q-input
            label="Confirmar Contraseña *"
            class="col-sm-6 col-md-6"
            :rules="[(val) => !!val || 'Campo requerido']"
            v-model="data.cpassword"
            type="password"
            outlined
            dense
          />
          <q-select
            outlined
            dense
            v-model="data.idRole"
            option-label="description"
            option-value="id"
            :options="optionRole"
            label="Tipo de Usuario"
            :rules="[(val) => !!val || 'Campo requerido']"
            class="col-sm-6 col-md-6"
          />

          <q-btn
            text-color="white"
            class="full-width custom-bg-primary"
            icon-right="send"
            label="Registrarse"
            type="submit"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useSkillStore } from "../../stores/skillStore.ts";

export default {
  name: "register",
  setup() {
    const store = useSkillStore();
    const { getRoles, register } = store;
    const $q = useQuasar();
    const router = useRouter();
    const optionRole: object[] = reactive([]);
    const data: {
      email: string;
      password: string;
      cpassword: string;
      name: string;
      idRole: any;
    } = reactive({
      email: "",
      password: "",
      cpassword: "",
      name: "",
      idRole: [],
    });
    onMounted(async () => {
      const varRoles = await getRoles();

      const { ok, message } = varRoles;
      message.data.forEach(function (element: any) {
        optionRole.push({
          id: element.id,
          description: element.description,
        });
      });
    });
    return {
      data,
      onMounted,
      isPwd: ref(true),
      onSubmit: async () => {
        const varRegister = await register(
          data.name,
          data.idRole.id,
          data.email,
          data.password,
          data.cpassword
        );
        const { ok, message } = varRegister;
        console.log(message);

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
      optionRole,
    };
  },
};
</script>

<style lang="scss">
.custom-bg {
  background-image: url(../../assets/top-view.jpg);
  background-size: cover;
}
.custom-bg-primary {
  background-color: #1e232d;
}
</style>
