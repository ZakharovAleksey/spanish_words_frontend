<template>
  <v-card variant="flat">
    <v-card-title class="text-center">List of incorrect words</v-card-title>
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

</style>