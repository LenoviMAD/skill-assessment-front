<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Skill Assessment Moises Moreno </q-toolbar-title>

        <div>
          <q-btn
            flat
            dense
            @click="onClick"
            text-color="white"
            round
            icon="logout"
            class="q-mr-sm"
            title="Salir"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menú </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useSkillStore } from "../stores/skillStore.ts";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const linksListAdmin = [
  {
    title: "Ban Usuario",
    icon: "group",
    link: "user",
  },
  {
    title: "Citas",
    icon: "task",
    link: "quote",
  },
  {
    title: "Registro",
    icon: "app_registration",
    link: "register",
  },
  {
    title: "Login",
    icon: "login",
    link: "home",
  },
];

const linksListUser = [
  {
    title: "Citas",
    icon: "task",
    link: "quote",
  },
  {
    title: "Registro",
    icon: "app_registration",
    link: "register",
  },
  {
    title: "Login",
    icon: "login",
    link: "home",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const store = useSkillStore();
    const { logout } = store;
    const $q = useQuasar();

    const router = useRouter();
    console.log(store.idRole);
    return {
      essentialLinks: store.idRole == 1 ? linksListAdmin : linksListUser,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      onClick: async () => {
        const varLogout = await logout();

        const { ok } = varLogout;

        if (ok == true) {
          $q.notify({
            message: "Hasta Luego",
            color: "positive",
            icon: "check_circle",
          });
          router.push({ name: "home" });
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
});
</script>
