<template>
  <v-container>
    <h1>Pedra Papel Tesoura - x PLAYER</h1>
    {{ this.counter }}
    <br />
    <p @click="choice('PEDRA')">PEDRA</p>
    <br />
    <p @click="choice('PAPEL')">PAPEL</p>
    <br />
    <p @click="choice('TESOURA')">TESOURA</p>
    <br />

    <router-link to="/jokenpo">voltar</router-link>
  </v-container>
</template>
<script>
const victory = {
  PEDRA: "TESOURA",
  PAPEL: "PEDRA",
  TESOURA: "PAPEL",
};
export default {
  data: () => ({
    bot: "",
    options: ["PEDRA", "PAPEL", "TESOURA"],
    counter: {
      all: 0,
      win: 0,
      lose: 0,
      tie: 0,
    },
  }),
  methods: {
    choice(value) {
      console.log(value);
      this.bot = this.options[Math.floor(Math.random() * this.options.length)];
      console.log(this.bot);

      //Status
      this.counter.all += 1;
      if (value === this.bot) {
        alert("EMPATE");
        this.counter.tie += 1;
      } else if (victory[value] == this.bot) {
        alert("GANHOU");
        this.counter.win += 1;
      } else {
        alert("PERDEU");
        this.counter.lose += 1;
      }
    },
  },
};
</script>
