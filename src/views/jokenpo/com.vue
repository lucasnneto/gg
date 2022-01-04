<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h1 class="d-flex align-center">
        <router-link
          to="/jokenpo"
          style="text-decoration: none"
          class="font-weight-bold d-flex align-center"
        >
          <v-icon size="36" color="black"> mdi-chevron-left </v-icon>
        </router-link>
        Pedra Papel Tesoura
        <v-chip class="font-weight-medium ml-3">Contra Máquina</v-chip>
      </h1>
      <v-btn @click="cleanStatus">Limpar Status</v-btn>
    </div>
    <div class="d-flex justify-space-between my-5">
      <div class="pa-3 d-flex align-center">
        <v-icon size="60">mdi-sword-cross</v-icon>
        <div class="d-flex flex-column justify-center align-center ml-2">
          <p>Partidas</p>
          <p class="font-weight-bold" style="font-size: 50px">
            {{ counter.all }}
          </p>
        </div>
      </div>
      <div class="pa-3 d-flex align-center">
        <v-icon size="40">mdi-trophy</v-icon>
        <div class="d-flex flex-column justify-center align-center ml-2">
          <p>Vitória</p>
          <p class="font-weight-bold" style="font-size: 30px">
            {{ counter.win }}
          </p>
        </div>
      </div>
      <div class="pa-3 d-flex align-center">
        <v-icon size="40">mdi-close-circle</v-icon>
        <div class="d-flex flex-column justify-center align-center ml-2">
          <p>Derrota</p>
          <p class="font-weight-bold" style="font-size: 30px">
            {{ counter.lose }}
          </p>
        </div>
      </div>
      <div class="pa-3 d-flex align-center">
        <v-icon size="40">mdi-shield-half-full</v-icon>
        <div class="d-flex flex-column justify-center align-center ml-2">
          <p>Empate</p>
          <p class="font-weight-bold" style="font-size: 30px">
            {{ counter.tie }}
          </p>
        </div>
      </div>
    </div>
    <v-row class="align-center">
      <v-col>
        <v-card
          @click="choice('PEDRA')"
          class="pa-3 d-flex flex-column align-center"
        >
          <v-img src="@/assets/pedra.png" class="forma" width="130px"></v-img>
          <p class="mt-3 mb-0 font-weight-bold">PEDRA</p>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          @click="choice('PAPEL')"
          class="pa-3 d-flex flex-column align-center"
        >
          <v-img src="@/assets/papel.png" class="forma" width="130px"></v-img>
          <p class="mt-3 mb-0 font-weight-bold">PAPEL</p>
        </v-card>
      </v-col>
      <v-col>
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
  </v-container>
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
