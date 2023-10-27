<template>
  <div>
    <v-card variant="flat" v-if="incorrect_answers.length !== 0">
      <v-card-title class="text-center">Uh-oh, some words slipped away!</v-card-title>
      <v-card-text class="text-center">
        <v-table :fixed-header="true" height="300px">
          <thead>
          <tr>
            <th class="text-center">
              Original
            </th>
            <th class="text-center">
              Translation
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in incorrect_answers">
            <td class="text-center">{{ item['en'] }}</td>
            <td class="text-center">{{ item['es'] }}</td>
          </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>

    <v-card v-else variant="flat">
      <v-card-title>
        Perfecto! No wrong answers, amigo!
      </v-card-title>
      <img src="@/assets/gifs/rocket.gif" alt="Your GIF Alt Text"/>
    </v-card>

  </div>
</template>

<script>

export default {
  name: "IncorrectAnswers",
  props: {
    incorrect_answers: Array
  }
}
</script>

<style scoped>

img {
  width: 300px;
  height: auto;
}

</style>