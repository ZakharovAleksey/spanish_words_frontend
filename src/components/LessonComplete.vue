<template>
  <v-fade-transition>
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
            <v-col class="text-center">
              <v-card class="parent-card" variant="outlined">
                <v-card-title class="py-0">score</v-card-title>
                <v-card class="child-card" variant="outlined">
                  <p class="text-subtitle-1">
                    <v-icon icon="mdi-bullseye-arrow" class="pr-2"/>
                    <b>{{ percent }}%</b>
                  </p>
                </v-card>
              </v-card>
            </v-col>
            <v-col class="text-center">
              <v-card class="parent-card-1" variant="outlined">
                <v-card-title class="py-0">time</v-card-title>
                <v-card class="child-card" variant="outlined">
                  <p class="text-subtitle-1">
                    <v-icon icon="mdi-clock-time-two-outline" class="pr-2"/>
                    <b>1:55</b>
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
            block="true"
            class="text-uppercase"
            color="success"
        >continue
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-fade-transition>
</template>

<script>
import * as consts from "@/js/constants"
import {isValueInRange} from "@/js/CommonFunctions"

// TODO: change titles
// TODO: sort out how to improve the v-cards with score and time
// TODO: refactor with FOR LOOP SCORE & TIME
// TODO: re-do parent 1 parent-2 for v-card with info
const ResultType = {AWESOME: 0, GREAT: 1, AVERAGE: 2, BAD: 3}
const ResultData = [
  {
    result: ResultType.AWESOME,
    min: 100.,
    max: Infinity,
    msg: 'You made no mistakes in this lesson',
    title: 'Perfect lesson!',
    // icon: 'mdi-emoticon-excited-outline',
    icon: 'mdi-rocket-launch-outline',
    color: 'success'
  },
  {
    result: ResultType.GREAT,
    min: 80.,
    max: 100.,
    msg: 'Lorem ipsum dolor sit amet',
    title: 'Lesson complete!',
    icon: 'mdi-emoticon-happy-outline',
    color: 'info'
  },
  {
    result: ResultType.AVERAGE,
    min: 50.,
    max: 80.,
    msg: 'Lorem ipsum dolor sit amet',
    title: 'Lesson complete!',
    icon: 'mdi-emoticon-neutral-outline',
    color: 'warning'
  },
  {
    result: ResultType.BAD,
    min: 0.,
    max: 50.,
    msg: 'Lorem ipsum dolor sit amet',
    title: 'Lesson complete!',
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
    rating() {
      return this.percent.toFixed(1) / 100. * consts.kMaxRating
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

/* Style for the border of v-card */
.border {
  border: 2px solid red;
}

.parent-card {
  background-color: #b0d6b1;
  border-color: #b0d6b1;
  border-radius: 20px;
  padding: 2px;
}

.parent-card-1 {
  background-color: #a0ccef;
  border-color: #a0ccef;
  border-radius: 20px;
  padding: 2px;
}

.child-card {
  border-radius: 20px;
  background-color: white;
  border-color: white;
  padding-bottom: 16px;
  padding-top: 16px;
}

</style>