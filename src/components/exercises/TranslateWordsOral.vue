<template>
  <div class="my-4">
    <p class="text-left title mb-2"><b>Click on the words, with unknown translations:</b></p>
    <v-chip
        v-for="item in exercise_data['word_translation']"
        :prepend-icon="item.icon"
        class="ma-1"
        :color="item.color"
        size="large"
        @click="updateWordStatus(item)"
    >{{ item[translate.from] }}
    </v-chip>
  </div>
</template>

<script>

import * as consts from "@/js/constants";

export default {
  name: "TranslateSingleWord",
  props: {
    exercise_data: Object,
    translate: Object,
    clean_exercise: Boolean,
    show_error_message: Boolean,
    is_readonly: Boolean
  },
  emits: ['exerciseCheckEnabled', 'isExerciseDoneCorrect'],
  created() {
    this.$emit('exerciseCheckEnabled', true)
  },
  data() {
    return {
      user_input: ''
    }
  },
  methods: {
    updateWordStatus(item) {
      if (this.is_readonly)
        return

      item.user_knows_translation = !item.user_knows_translation
      item.icon = item.user_knows_translation ?
          consts.WordStatusMdiIcon.REMEMBERED :
          consts.WordStatusMdiIcon.FORGOTTEN

      item.color = item.user_knows_translation ?
          consts.Color.GOOD :
          consts.Color.BAD

      this.$emit('isExerciseDoneCorrect', {
        correct: item.user_knows_translation,
        en: item['en'],
        es: item['es']
      })
    }
  }
}
</script>

<style scoped>

</style>