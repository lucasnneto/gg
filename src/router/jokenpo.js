import Jokenpo from "../views/jokenpo/index.vue";
import JokenpoCom from "../views/jokenpo/com.vue";
import JokenpoPlayer from "../views/jokenpo/player.vue";

export default [
  {
    path: "/jokenpo",
    name: "jokenpo",
    component: Jokenpo,
  },
  {
    path: "/jokenpo/com",
    name: "jokenpo.com",
    component: JokenpoCom,
  },
  {
    path: "/jokenpo/:id",
    name: "jokenpo.player",
    component: JokenpoPlayer,
  },
];
