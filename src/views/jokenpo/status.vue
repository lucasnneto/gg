<template>
  <v-dialog persistent :value="modal" max-width="500px">
    <v-card min-height="500px" class="d-flex align-center justify-center pa-3">
      <div v-if="animation === 0">
        <v-img
          src="@/assets/pedra.png"
          class="animate__animated animate__shakeX animate__delay-0s"
          max-width="230px"
        ></v-img>
      </div>
      <div v-else-if="animation === 1">
        <v-img
          src="@/assets/papel.png"
          class="animate__animated animate__shakeX animate__delay-2s"
          max-width="230px"
        ></v-img>
      </div>
      <div v-else-if="animation === 2">
        <v-img
          src="@/assets/tesoura.png"
          class="animate__animated animate__shakeX animate__delay-4s"
          max-width="230px"
        ></v-img>
      </div>
      <div
        v-else
        class="d-flex flex-column justify-space-between align-center"
        style="height: 400px !important"
      >
        <h1
          style="font-size: 40px"
          :class="{
            'red--text': status === 'LOSE',
            'green--text': status === 'VICTORY',
          }"
        >
          {{ cmptStatus }}
        </h1>
        <div class="d-flex">
          <div class="d-flex flex-column align-center">
            <v-img
              :src="require(`@/assets/${imagens[you]}.png`)"
              max-width="70px"
            ></v-img>
            <p class="font-weight-medium mt-2">Você</p>
          </div>
          <v-icon color="black" size="50">mdi-close</v-icon>
          <div class="d-flex flex-column align-center">
            <v-img
              :src="require(`@/assets/${imagens[enemy]}.png`)"
              max-width="70px"
            ></v-img>
            <p class="font-weight-medium mt-2">Inimigo</p>
          </div>
        </div>
        <v-btn outlined width="150px" @click="$emit('update:modal', false)"
          >FECHAR</v-btn
        >
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
const MAX_TIME = 2;
const MAX_STEPS = 3;
import { STATUS } from "@/utils/constants";
const imagens = {
  PEDRA: "pedra",
  PAPEL: "papel",
  TESOURA: "tesoura",
};
export default {
  props: {
    modal: Boolean,
    status: String,
    you: String,
    enemy: String,
  },
  data() {
    return {
      imagens,
      animation: 0,
      interval: "",
      countdown: MAX_TIME,
    };
  },
  watch: {
    countdown() {
      if (this.countdown <= 0) {
        clearInterval(this.timerId);
        this.animation += 1;
        if (this.animation < MAX_STEPS) {
          this.countdown = MAX_TIME;
          this.countdownTimer();
        }
      }
    },
  },
  mounted() {
    this.countdownTimer();
  },
  computed: {
    cmptStatus() {
      switch (this.status) {
        case STATUS.VICTORY:
          return "Vitória";

        case STATUS.TIE:
          return "Empate";

        case STATUS.LOSE:
          return "Derrota";
      }
      return "";
    },
  },
  methods: {
    countdownTimer() {
      this.timerId = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown -= 1;
        }
      }, 1000);
    },
  },
};
</script>
<style scoped>
.fill-height {
  height: 100% !important;
}
</style>
