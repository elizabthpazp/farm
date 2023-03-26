<!-- eslint-disable vue/no-multiple-template-root -->
 <template>
  <div id="app">
    <VueSidebarMenuAkahon style="padding-bottom: 1px;"
      menuTitle="Finca"
      menuLogo="./finca.png"
      bgColor="#42b983"
      secondaryColor="#252850"
      menuItemsHoverColor="#252850"
      profileImg="./test.png"
      profileName="username"
      profileRole="admin"
      :menuItems="items"
      :isSearch="false"
      :button-exit-clicked="'ee'"
    />
 
    <router-view />
  </div>
</template>

<script>
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";

export default {
  name: "App",
  components: {
    VueSidebarMenuAkahon,
    // eslint-disable-next-line vue/no-unused-components
  },
  data() {
    return {
      items: [
        // {
        //   link: "/",
        //   name: "Principal",
        //   tooltip: "Dashboard",
        //   icon: "bx-grid-alt",
        // },
        { link: "/users", name: "Usuario", tooltip: "User", icon: "bx-user" },
        {
          link: "/animales",
          name: "Animales",
          tooltip: "Tables",
          icon: "bx-table",
        },
        {
          link: "/cultivos",
          name: "Cultivos",
          tooltip: "Tables",
          icon: "bx-table",
        },
        {
          link: "/equipos",
          name: "Equipos",
          tooltip: "Tables",
          icon: "bx-table",
        },
        // {
        //   link: "/provincias",
        //   name: "Provincias",
        //   tooltip: "Tables",
        //   icon: "bx-table",
        // },
        // {
        //   link: "/altas",
        //   name: "Altas",
        //   tooltip: "Tables",
        //   icon: "bx-table",
        // },
        // {
        //   link: "/bajas",
        //   name: "Bajas",
        //   tooltip: "Tables",
        //   icon: "bx-table",
        // },
        // {
        //   link: "/data",
        //   name: "Datos Economicos",
        //   tooltip: "Tables",
        //   icon: "bx-table",
        // },
        // {
        //   link: "/results",
        //   name: "Resultados Economicos",
        //   tooltip: "Tables",
        //   icon: "bx-table",
        // },
        // {
        //   link: "/hechos",
        //   name: "Hechos Delictivos",
        //   tooltip: "Tables",
        //   icon: "bx-table",
        // },
        // { link: "#", name: "Filtred", tooltip: "Filtred", icon: "bx-heart" },
        // {
        //   link: "#",
        //   name: "Information",
        //   tooltip: "Information",
        //   icon: "bx-folder",
        // },
        // { link: "#", name: "Setting", tooltip: "Setting", icon: "bx-cog" },
      ],
    };
  },  
};
</script>


