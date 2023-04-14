<!-- eslint-disable vue/no-multiple-template-root -->
 <template>
  <div id="app">
 
    <router-view />

    <VueSidebarMenuAkahon style="padding-bottom: 1px;"
      :isUsedVueRouter="true"
      menuTitle="Finca"
      menuLogo="./finca.png"
      bgColor="#42b983"
      secondaryColor="#252850"
      menuItemsHoverColor="#252850"
      profileImg="./test.png"
      :profileName="getUserName()"
      :profileRole="getRole()"
      :menuItems="items"
      :isSearch="false"
      :button-exit-clicked="'ee'"
    />

    
  </div>
</template>

<script>
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";
import { ref, getCurrentInstance } from "vue";
import { useFincaStore } from '@/stores/finca'

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
          name: "Alimentos",
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
          link: "/total",
          name: "Total producción",
          tooltip: "Dashboard",
          icon: "bx-grid-alt",
        }, 
        // {
        //   link: "/results",
        //   name: "Resultados Economicos",
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
  methods:{
    getLink(){
      return `<router-link to='/animales'></router-link>`
    },
    getUserName(){  
     const fincaActual = useFincaStore();
     return fincaActual.user;
    },
    getRole(){ 
     const fincaActual = useFincaStore();
     return fincaActual.role;
    }
  }
};
</script>


