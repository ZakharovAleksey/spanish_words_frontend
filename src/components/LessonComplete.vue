<template>
  <v-card rounded="lg" width="360" variant="flat">
    <v-card-item>
      <v-card-title>
        <div class="d-flex justify-center text-h4">{{ state.title }}</div>
      </v-card-title>
    </v-card-item>

    <v-card-text class="pb-0">
      <v-container>
        <v-row class="f-flex justify-center">
          <p class="text-subtitle-1">{{ state.msg }} </p>
        </v-row>
        <v-row class="f-flex justify-center mt-4">
          <v-icon :icon="state.icon" :color="state.color" class="result-icon"></v-icon>
        </v-row>
        <v-row class="mt-4">
          <v-col v-for="item in lesson_results" class="text-center">
            <v-card :class="item.style" variant="outlined">
              <v-card-title class="py-0">{{ item.title }}</v-card-title>
              <v-card class="child-card" variant="outlined">
                <p class="text-subtitle-1">
                  <v-icon :icon="item.icon" class="pr-2"/>
                  <b>{{ item.text }}</b>
                </p>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>


    <v-card-actions class="justify-center">
      <v-btn
          @click="finishLesson"
          variant="elevated"
          rounded="lg"
          size="large"
          :block="true"
          class="text-uppercase"
          color="success"
      >continue
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import {isValueInRange} from "@/js/CommonFunctions"

const ResultType = {AWESOME: 0, GREAT: 1, AVERAGE: 2, BAD: 3}
const ResultData = [
  {
    result: ResultType.AWESOME,
    min: 100.,
    max: Infinity,
    msg: 'You made no mistakes in this lesson',
    title: 'Perfect lesson!',
    icon: 'mdi-rocket-launch-outline',
    color: 'success'
  },
  {
    result: ResultType.GREAT,
    min: 80.,
    max: 100.,
    msg: 'Keep it up, you\'re doing great',
    title: 'Fantastic Progress!',
    icon: 'mdi-emoticon-happy-outline',
    color: 'info'
  },
  {
    result: ResultType.AVERAGE,
    min: 50.,
    max: 80.,
    msg: 'You\'re making progress, keep going',
    title: 'Good Effort!',
    icon: 'mdi-emoticon-neutral-outline',
    color: 'warning'
  },
  {
    result: ResultType.BAD,
    min: 0.,
    max: 50.,
    msg: 'Stay positive, practice makes perfect',
    title: 'Keep Practicing!',
    icon: 'mdi-emoticon-sad-outline',
    color: 'error'
  }
]
export default {
  name: 'LessonComplete',
  emits: ['lessonIsFinished'],
  props: {
    words_with_mistakes_count: Number,
    total_words_count: Number,
    time_spent: Date | String
  },
  computed: {
    percent() {
      return 100. - Math.round(this.words_with_mistakes_count / this.total_words_count * 100.)
    },
    state() {
      return ResultData.find((item) => {
        return isValueInRange(this.percent, item.min, item.max)
      })
    },
    lesson_results() {
      return [
        {
          title: 'score',
          icon: 'mdi-bullseye-arrow',
          text: `${this.percent}%`,
          style: 'round-border score-background'
        },
        {
          title: 'time',
          icon: 'mdi-clock-time-two-outline',
          text: this.time_spent,
          style: 'round-border time-background'
        },
      ]
    }
  },
  methods: {
    finishLesson() {
      this.$emit('lessonIsFinished')
    }
  }
}
</script>


<style scoped>

/*
  green: #b0d6b1
  blue: #a0ccef
  orange: #f2c893
  red: #d6939f
 */

.result-icon {
  font-size: 10rem;
}

.round-border {
  border-radius: 20px;
  padding: 2px;
}

.score-background {
  background-color: #b0d6b1;
  border-color: #b0d6b1;
}

.time-background {
  background-color: #a0ccef;
  border-color: #a0ccef;
}

.child-card {
  border-radius: 20px;
  background-color: white;
  border-color: white;
  padding-bottom: 16px;
  padding-top: 16px;
}

</style>