<script setup>
import * as consts from '@/js/constants'
</script>

<template>
  <v-container class="d-flex align-center justify-center fill-height">
    <v-card v-if="is_lesson_in_progress" min-width="360" class="pa-2" variant="flat">
      <v-container class="text-center lesson-area">

        <v-progress-linear
            v-model="progress_bar_count"
            :max="lesson_data.length"
            :height="13"
            rounded
            color="green"
            class="my-3"
        />

        <translate-single-word-view
            v-if="lesson_data[current_exercise_id]['exercise_type'] === consts.ExerciseType.TRANSLATE_SINGLE_WORD"
            :exercise_data="lesson_data[current_exercise_id]"
            :show_error_message="show_error_message"
            :clean_exercise="force_clean_exercise_content"
            :is_readonly="make_child_readonly"
            @exercise-check-enabled="handleIfButtonEnabled"
            @is-exercise-done-correct="handleExerciseAnswer"
            @exercise-cleaned="handleCleandExercise"
        />

        <v-btn
            :color="button.color"
            :disabled="button.disabled"
            @click="onButtonClick"
            variant="elevated"
            rounded="lg"
            size="large"
            :block="true"
            class="text-uppercase"
        >{{ button.text }}
        </v-btn>
      </v-container>
    </v-card>
    <lesson-complete
        v-else-if="is_lesson_completed"
        :words_with_mistakes_count="incorrect_answers.length"
        :total_words_count="lesson_data.length"
        @lesson-is-finished="finishLesson"
    />
    <incorrect-answers
        v-else-if="is_lesson_finished"
        :incorrect_answers="incorrect_answers"
    />
  </v-container>
</template>

<script>
/*
  Purpose:
  1.  Executes practice: exercise could be one-by-one.
      Each task is a separate vue corresponding to the task type.
  2.  When all tasks have been done, shows the pop-up message with result.
  3.  On result window clode shows the list of the forgotten words.
  4.  Sets up trigger to the parent vue that user can start the next practice.
 */

import * as consts from '@/js/constants'

// Child components
import TranslateSingleWordView from '@/components/exercises/TranslateSingleWord.vue'
import LessonComplete from '@/components/LessonComplete.vue'
import IncorrectAnswers from '@/components/IncorrectAnswers.vue'

// Constants
const ButtonState = {CHECK: 0, CONTINUE: 1, GOT_IT: 2}
const ButtonStateProperties = [
  {
    state: ButtonState.CHECK,
    color: 'success',
    disabled: true,
    text: 'check'
  },
  {
    state: ButtonState.CONTINUE,
    color: 'success',
    disabled: false,
    text: 'continue'
  },
  {
    state: ButtonState.GOT_IT,
    color: 'error',
    disabled: false,
    text: 'got it'
  }
]
const LessonState = {IN_PROGRESS: 0, COMPLETED: 1, FINISHED: 2}

export default {
  name: "LessonRunner",
  components: {
    TranslateSingleWordView,
    LessonComplete,
    IncorrectAnswers
  },
  data() {
    return {
      practice_type: consts.PracticeType.TRANSLATE_WORDS_WRITING,
      lesson_data: [
        {exercise_type: consts.ExerciseType.TRANSLATE_SINGLE_WORD, es: 'hola', en: 'hello'},
        {exercise_type: consts.ExerciseType.TRANSLATE_SINGLE_WORD, es: 'adios', en: 'by'}
      ],
      incorrect_answers: [],
      current_exercise_id: 0,
      current_answer_info: {
        correct: false,
        es: '',
        en: ''
      },
      practice_result: {
        time_spent: 0,
        result_color: ''
      },
      button: ButtonStateProperties[ButtonState.CHECK],
      lesson_state: LessonState.IN_PROGRESS,
      // For 2 exercises of the same type in a row, we need to clean up the child component.
      // Otherwise, it 2d initial exercise state = 1st final exercise state (text, etc.)
      force_clean_exercise_content: false,
      // This value controls the behaviour presence/absence of error message in the child component
      show_error_message: false,
      // On the moment when the answer is checked and before running the next one lock the child
      make_child_readonly: false,
    }
  },
  computed: {
    is_lesson_in_progress() {
      return this.lesson_state === LessonState.IN_PROGRESS
    },
    is_lesson_completed() {
      return this.lesson_state === LessonState.COMPLETED
    },
    is_lesson_finished() {
      return this.lesson_state === LessonState.FINISHED
    },
    progress_bar_count() {
      return this.isLastExercise() && this.button.state !== ButtonState.CHECK ?
          this.current_exercise_id + 1 :
          this.current_exercise_id
    }
  },
  methods: {
    // Support functions
    isLastExercise() {
      return this.current_exercise_id === this.lesson_data.length - 1
    },
    finishLesson() {
      this.lesson_state = LessonState.FINISHED
    },
    // Event functions
    handleIfButtonEnabled(is_enabled) {
      this.button.disabled = !is_enabled
    },
    handleExerciseAnswer(answer_info) {
      this.current_answer_info = answer_info
    },
    handleCleandExercise() {
      this.force_clean_exercise_content = false
      this.show_error_message = false
    },
    onButtonClick() {
      if (this.button.state === ButtonState.CHECK) {
        this.button = (this.current_answer_info.correct) ?
            ButtonStateProperties[ButtonState.CONTINUE] :
            ButtonStateProperties[ButtonState.GOT_IT]

        if (!this.current_answer_info.correct) {
          let tmp = this.current_answer_info
          delete tmp.correct
          this.incorrect_answers.push(tmp)
        }
        // Force child component to show error message
        this.show_error_message = true
        this.make_child_readonly = true
      } else {
        if (this.isLastExercise()) {
          this.lesson_state = LessonState.COMPLETED
        } else {
          this.button = ButtonStateProperties[ButtonState.CHECK]
          this.current_exercise_id += 1

          this.force_clean_exercise_content = true
        }
        this.make_child_readonly = false
      }
    }
  }
}

</script>

<style scoped>

.lesson-area {
  min-width: 425px;
}
</style>