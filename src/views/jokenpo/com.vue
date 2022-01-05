<template>
  <v-flex class="mx-5 mt-5">
    <div
      class="d-flex justify-space-between"
      :class="{ 'flex-column': isMobile }"
    >
      <div
        class="d-flex"
        :class="{
          'flex-column align-start': isMobile,
          'align-center': !isMobile,
        }"
      >
        <h1
          class="d-flex align-center"
          :style="isMobile ? 'font-size: 30px' : ''"
        >
          <router-link
            to="/jokenpo"
            style="text-decoration: none"
            class="font-weight-bold d-flex align-center"
          >
            <v-icon size="36" color="black"> mdi-chevron-left </v-icon>
          </router-link>
          Pedra Papel Tesoura
        </h1>
        <v-chip class="font-weight-medium ml-3"
          >{{ isMobile ? "" : "Contra" }} Máquina</v-chip
        >
      </div>
      <v-btn
        :fab="isMobile"
        :style="isMobile ? 'align-self: end' : ''"
        @click="cleanStatus"
      >
        <v-icon v-if="isMobile" size="30">mdi-delete</v-icon>
        <span v-else> Limpar Status </span>
      </v-btn>
    </div>
    <div class="d-flex justify-space-between my-5">
      <div class="pa-3 d-flex align-center">
        <v-icon v-if="!isMobile" size="60" class="mr-2">mdi-sword-cross</v-icon>
        <div class="d-flex flex-column justify-center align-center">
          <p>Partidas</p>
          <p class="font-weight-bold" style="font-size: 50px">
            {{ counter.all }}
          </p>
        </div>
      </div>
      <div class="pa-3 d-flex align-center">
        <v-icon v-if="!isMobile" size="40" class="mr-2">mdi-trophy</v-icon>
        <div class="d-flex flex-column justify-center align-center">
          <p>Vitória</p>
          <p class="font-weight-bold" style="font-size: 30px">
            {{ counter.win }}
          </p>
        </div>
      </div>
      <div class="pa-3 d-flex align-center">
        <v-icon v-if="!isMobile" size="40" class="mr-2"
          >mdi-close-circle</v-icon
        >
        <div class="d-flex flex-column justify-center align-center">
          <p>Derrota</p>
          <p class="font-weight-bold" style="font-size: 30px">
            {{ counter.lose }}
          </p>
        </div>
      </div>
      <div class="pa-3 d-flex align-center">
        <v-icon v-if="!isMobile" size="40" class="mr-2"
          >mdi-shield-half-full</v-icon
        >
        <div class="d-flex flex-column justify-center align-center">
          <p>Empate</p>
          <p class="font-weight-bold" style="font-size: 30px">
            {{ counter.tie }}
          </p>
        </div>
      </div>
    </div>
    <v-row class="align-center">
      <v-col sm="4" cols="12">
        <v-card
          @click="choice('PEDRA')"
          class="pa-3 d-flex flex-column align-center"
        >
          <v-img src="@/assets/pedra.png" class="forma" width="130px"></v-img>
          <p class="mt-3 mb-0 font-weight-bold">PEDRA</p>
        </v-card>
      </v-col>
      <v-col sm="4" cols="12">
        <v-card
          @click="choice('PAPEL')"
          class="pa-3 d-flex flex-column align-center"
        >
          <v-img src="@/assets/papel.png" class="forma" width="130px"></v-img>
          <p class="mt-3 mb-0 font-weight-bold">PAPEL</p>
        </v-card>
      </v-col>
      <v-col sm="4" cols="12">
        <v-card
          @click="choice('TESOURA')"
          class="pa-3 d-flex flex-column align-center"
        >
          <v-img class="forma" src="@/assets/tesoura.png" width="130px"></v-img>
          <p class="mt-3 mb-0 font-weight-bold">TESOURA</p>
        </v-card>
      </v-col>
    </v-row>
    <status
      v-if="modal"
      :modal.sync="modal"
      :status="situacao"
      :you="you"
      :enemy="bot"
    />
  </v-flex>
</template>
<script>
import status from "./status.vue";
import { STATUS, VICTORY_JOKENPO } from "@/utils/constants";
export default {
  components: {
    status,
  },
  data: () => ({
    you: "",
    bot: "",
    options: ["PEDRA", "PAPEL", "TESOURA"],
    counter: {
      all: 0,
      win: 0,
      lose: 0,
      tie: 0,
    },
    modal: false,
    situacao: "",
  }),
  created() {
    const counter = JSON.parse(localStorage.getItem("gg-jokenpo-com") || false);
    if (counter) {
      this.counter = counter;
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  methods: {
    cleanStatus() {
      (this.counter = {
        all: 0,
        win: 0,
        lose: 0,
        tie: 0,
      }),
        localStorage.setItem("gg-jokenpo-com", JSON.stringify(this.counter));
    },
    choice(value) {
      this.you = value;
      this.bot = this.options[Math.floor(Math.random() * this.options.length)];

      //Status
      this.counter.all += 1;
      if (value === this.bot) {
        this.situacao = STATUS.TIE;
        this.counter.tie += 1;
      } else if (VICTORY_JOKENPO[value] == this.bot) {
        this.situacao = STATUS.VICTORY;
        this.counter.win += 1;
      } else {
        this.situacao = STATUS.LOSE;
        this.counter.lose += 1;
      }
      this.modal = true;
      localStorage.setItem("gg-jokenpo-com", JSON.stringify(this.counter));
    },
  },
};
</script>
<style scoped>
.forma:hover {
  animation: pulse;
  animation-duration: 1s;
}
p {
  margin: 0 !important;
}
</style>
