<template>
  <div>
    <p class="text-left title mb-2"><b>Translate this word:</b></p>
    <div>
      <v-text-field variant="outlined" :readonly="true">{{ exercise_data['en'] }}</v-text-field>
      <v-text-field
          v-model="user_input"
          :readonly="is_readonly"
          label="Translation"
          variant="outlined"
          @input="notifyParent"
      ></v-text-field>
    </div>
    <div class="save-alert-space">
      <div v-if="show_error_message">
        <v-alert
            v-if="!is_user_input_correct"
            border-color="red"
            border="start"
            class="text-left text-subtitle-2"
        >
          <div class="red-text">
            <div class="mb-1">
              <v-icon class="mr-1">mdi-close-circle</v-icon>
              <b class="title">Incorrect</b>
            </div>
            <b>Correct Answer:</b> {{ exercise_data['es'] }}
          </div>
        </v-alert>
        <v-alert
            v-if="is_user_input_correct"
            border-color="success"
            border="start"
            class="text-left text-subtitle-2"
        >
          <div class="green-text">
            <div class="mb-1">
              <v-icon class="mr-1">mdi-check</v-icon>
              <b class="title">Amazing</b>
            </div>
              Good job! Can you do the next one?
          </div>
        </v-alert>
      </div>
    </div>
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
    clean_exercise(new_value) {
      if (new_value) {
        this.user_input = ''
        this.$emit('exerciseCleaned')

        const is_string_empty = this.user_input === ''
        this.$emit('exerciseCheckEnabled', !is_string_empty)
      }
    }
  },
  computed: {
    is_user_input_correct() {
      return compareSpanishWords(this.user_input, this.exercise_data['es'])
    }
  },
  methods: {
    notifyParent() {
      // Update check button state
      const is_string_empty = this.user_input === ''
      this.$emit('exerciseCheckEnabled', !is_string_empty)

      // Update exercise status: correct / incorrect
      // const is_user_input_correct = compareSpanishWords(
      //     this.user_input, this.exercise_data['es']
      // )
      this.$emit('isExerciseDoneCorrect', {
        correct: this.is_user_input_correct,
        en: this.exercise_data['en'],
        es: this.exercise_data['es']
      })
    }
  }
}
</script>


<style scoped>
.red-text {
  color: red
}

.green-text {
  color: green;
}

.title {
  font-size: 16px;
}

/*
  Saves the empty space for the alert so the button 'check' does not move.
  Previous value was: 7vh
 */
.save-alert-space {
  min-height: 100px;
}
</style>