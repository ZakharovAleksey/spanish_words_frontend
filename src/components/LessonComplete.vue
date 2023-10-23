<template>
  <v-card rounded="lg" width="360">
    <v-card-item>
      <v-card-title>
        <div class="d-flex justify-center mt-auto text-h5">Lesson complete!</div>
      </v-card-title>
    </v-card-item>

    <v-card-text>
      <p>Wrong: {{ words_with_mistakes_count }} </p>
      <p>Total: {{ total_words_count }}</p>
      <p>Percent: {{ percent }}</p>
    </v-card-text>

    <v-card-actions class="align-center justify-center">
      <v-btn
          @click="finishLesson"
          class="text-uppercase my-1 my-button"
          rounded="lg"
          size="large"
          variant="elevated"
      >continue
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>

export default {
  name: 'LessonComplete',
  emits: ['lessonIsFinished'],
  props: {
    words_with_mistakes_count: Number,
    total_words_count: Number,
  },
  computed: {
    percent() {
      return Math.round(this.words_with_mistakes_count / this.total_words_count * 100.)
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

</style>