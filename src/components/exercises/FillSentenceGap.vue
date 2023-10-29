<template>
  <div>
    <p class="text-left title mb-2"><b>Fill the gap:</b></p>
    <div>
      <v-text-field variant="outlined" :readonly="true">{{
          exercise_data['sentence_with_gap']
        }}
      </v-text-field>
      <v-container class="px-0">
        <v-row>
          <v-col v-for="item in choices">
            <v-chip
                :color="item.color"
                @click="updateWordStatus(item)"
                size="large"
                :label="true"
            >
              <p class="black-text">{{ item.word }}</p>
            </v-chip>
          </v-col>
        </v-row>
      </v-container>
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
            <b>Correct Answer:</b> {{ exercise_data[translate.to] }}
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
const ChipColorType = {
  DEFAULT: 'grey-darken-3',
  SELECTED: 'light-blue-darken-3'
}

export default {
  name: "TranslateSingleWord",
  props: {
    exercise_data: Object,
    translate: Object,
    clean_exercise: Boolean,
    show_error_message: Boolean,
    is_readonly: Boolean
  },
  data() {
    return {
      user_input: '',
      choices: []
    }
  },
  created() {
    this.makeChoices()
  },
  emits: ['exerciseCheckEnabled', 'isExerciseDoneCorrect', 'exerciseCleaned'],
  watch: {
    clean_exercise(new_value) {
      if (new_value) {
        this.user_input = ''
        this.$emit('exerciseCleaned')

        this.$emit('exerciseCheckEnabled', this.isAnyWordChosen())
      }
    },
    exercise_data: {
      handler() {
        this.makeChoices()
      },
      deep: true
    },
    is_readonly(new_value) {
      if (new_value) {
        const id = this.choices.findIndex((data) => data.is_selected)
        this.choices[id].color = this.is_user_input_correct ? 'green' : 'red'
      }
    }
  },
  computed: {
    is_user_input_correct() {
      return this.user_input === this.exercise_data[this.translate.to]
    }
  },
  methods: {
    isAnyWordChosen() {
      return this.choices.findIndex(data => data.is_selected) !== -1
    },
    makeChoices() {
      this.choices = this.exercise_data.choices.map((data, index) => {
        return {
          word: data,
          color: ChipColorType.DEFAULT,
          is_selected: false
        }
      })
    },
    notifyParent() {
      // Update check button state
      this.$emit('exerciseCheckEnabled', this.isAnyWordChosen())

      this.$emit('isExerciseDoneCorrect', {
        correct: this.is_user_input_correct,
        en: this.exercise_data['en'],
        es: this.exercise_data['es']
      })
    },
    updateWordStatus(item) {
      if (this.is_readonly)
        return

      // Clean the previous choices
      this.choices.forEach((data) => {
        data.is_selected = false
        data.color = ChipColorType.DEFAULT
      })

      item.is_selected = true
      item.color = ChipColorType.SELECTED

      this.user_input = item.word

      this.notifyParent()
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

.black-text {
  color: black;
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