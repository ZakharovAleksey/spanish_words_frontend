<template>
  <div>
    <p>Translate this word:</p>
    <v-text-field variant="outlined" :readonly="true">{{ exercise_data['en'] }}</v-text-field>
    <v-text-field
        v-model="user_input"
        :readonly="is_readonly"
        :persistent-hint="true"
        label="Translation"
        variant="outlined"
        @input="notifyParent"
    ></v-text-field>
    <p v-if="show_error_message">Correct: {{ exercise_data['es'] }}</p>
  </div>
</template>

<script>
import {compareSpanishWords} from '@/js/CommonFunctions'

export default {
  name: "TranslateSingleWord",
  props: {
    exercise_data: Object,
    clean_exercise: Boolean,
    show_error_message: Boolean,
    is_readonly: Boolean
  },
  data() {
    return {
      user_input: ''
    }
  },
  emits: ['exerciseCheckEnabled', 'isExerciseDoneCorrect', 'exerciseCleaned'],
  watch: {
    clean_exercise(new_value, old_value) {
      if (new_value) {
        this.user_input = ''
        this.$emit('exerciseCleaned')
      }
    }
  },
  methods: {
    notifyParent() {
      // Update check button state
      const is_string_empty = this.user_input === ''
      this.$emit('exerciseCheckEnabled', !is_string_empty)

      // Update exercise status: correct / incorrect
      const is_user_input_correct = compareSpanishWords(
          this.user_input, this.exercise_data['es']
      )
      this.$emit('isExerciseDoneCorrect', {
        correct: is_user_input_correct,
        en: this.exercise_data['en'],
        es: this.exercise_data['es']
      })
    }
  }
}
</script>


<style scoped>

</style>