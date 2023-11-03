<template>
  <!-- MAIN PAGE CONTENT -->
  <v-row>

    <v-col cols="12" xs="12" sm="12" md="3">
      <div class="parameters-column text-center">
        <!--    MAIN LESSON PARAMETERS    -->
        <v-list>
          <!--    GOOGLE SHEET    -->
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip text="Google sheet to retrieve words" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-icon icon="mdi-google-spreadsheet" size="x-large" v-bind="props"
                          :color="selected_gsheet ? 'success': 'grey-darken-3'"
                  />
                </template>
              </v-tooltip>
            </template>
            <v-select
                label="Google sheet"
                v-model="selected_gsheet"
                :items="gsheets"
                :loading="gsheets_loading"
                :clearable="true"
                :disabled="is_parameters_select_disabled"
                :hide-details="true"
                variant="outlined"
                class="my-2 my-button"/>
          </v-list-item>

          <!--  CATEGORY  -->
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip text="Column with the words categories" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-icon icon="mdi-shape-outline" size="x-large" v-bind="props"
                          :color="selected_category ? 'success': 'grey-darken-3'"
                  />
                </template>
              </v-tooltip>
            </template>
            <v-select
                label="Google sheet base column"
                v-model="selected_category"
                :items="categories"
                item-title="text"
                item-value="id"
                :loading="categories_loading"
                :clearable="true"
                :disabled="is_parameters_select_disabled"
                :hide-details="true"
                variant="outlined"
                class="my-2"/>
          </v-list-item>

          <!--  SUB THEME  -->
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip text="Categories of words to repeat" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-icon icon="mdi-shape-plus" size="x-large" v-bind="props"
                          :color="!isCategoriesEmpty() ? 'success': 'grey-darken-3'"
                  />
                </template>
              </v-tooltip>
            </template>
            <v-autocomplete
                label="Words categories"
                v-model="selected_category_key"
                :items="category_keys"
                :loading="category_key_loading"
                :clearable="true"
                :disabled="is_parameters_select_disabled"
                multiple="true"
                hide-details="true"
                variant="outlined"
                :menu-props="{ maxWidth : 5 }"
                class="my-2"
            >
              <!--  SELECT ALL EXTRA CHECKBOX  -->
              <template v-slot:prepend-item v-if="category_keys.length !== 0">
                <v-list-item title="all categories" @click="selectAll">
                  <template v-slot:prepend>
                    <v-checkbox-btn :model-value="isAllCategoriesSelected"></v-checkbox-btn>
                  </template>
                </v-list-item>

                <v-list-item title="latest added words" @click="selectLatest">
                  <template v-slot:prepend>
                    <v-checkbox-btn :model-value="select_latest_words"></v-checkbox-btn>
                  </template>
                </v-list-item>
                <v-divider class="my-1"></v-divider>
              </template>

              <!--  CROP THE NUMBER OF SELECTED UNITS IN CASE MANY SELECTED  -->
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item.title }}</span>
                </v-chip>
                <span v-if="index === 2" class="text-grey text-caption align-self-center">
                    (+{{ selected_category_key.length - 2 }} others)
                  </span>
              </template>

            </v-autocomplete>
          </v-list-item>

          <!--    LANGUAGE      -->
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip text="Original language to translate from" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-icon icon="mdi-translate" size="x-large" v-bind="props" color="success"/>
                </template>
              </v-tooltip>
            </template>
            <v-select
                label="Original language"
                v-model="selected_language"
                :items="languages"
                :disabled="is_parameters_select_disabled"
                :hide-details="true"
                variant="outlined"
                class="my-2"/>
          </v-list-item>

          <!--  NUMBER OF WORDS TO REPEAT  -->
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip text="Number of words to repeat" location="bottom">
                <template v-slot:activator="{ props }">
                  <v-icon icon="mdi-counter" size="x-large" v-bind="props" color="success"/>
                </template>
              </v-tooltip>
            </template>
            <v-select
                label="Number of words to repeat"
                v-model="selected_number"
                :items="numbers"
                :disabled="is_parameters_select_disabled"
                variant="outlined"
                :hide-details="true"
                class="my-2"/>
          </v-list-item>

          <!--  TYPE OF SELF CHECK  -->
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip text="Practise type. Each has different exercises"
                         location="bottom">
                <template v-slot:activator="{ props }">
                  <v-icon icon="mdi-animation" size="x-large" v-bind="props" color="success"/>
                </template>
              </v-tooltip>
            </template>
            <v-select
                label="Practice type"
                v-model="practice_type"
                :items="practices"
                :disabled="is_parameters_select_disabled"
                variant="outlined"
                :hide-details="true"
                item-title="title"
                item-value="value"
                class="my-2"/>
          </v-list-item>
        </v-list>

        <!--    START LESSON BUTTON    -->
        <v-btn
            rounded="lg"
            size="large"
            class="text-uppercase mt-3 my-button"
            text="start lesson"
            color="success"
            :disabled="is_parameters_select_disabled"
            @click="getWords"/>
      </div>
    </v-col>

    <v-col cols="12" xs="12" sm="12" md="9">
      <v-row v-if="words_loading" class="justify-center fill-height align-center">
        <v-progress-circular
          indeterminate
          color="success"
          :size="60"
          :width="12"
      />
      </v-row>
      <lesson-runner
          v-else
          :lesson_data="lesson_data"
          :translate="translate"
          :practice_type="practice_type"
          @is-lesson-finished="handleFinishLesson"
      />
    </v-col>

  </v-row>
</template>

<script>
import LessonRunner from '@/components/LessonRunner.vue'
import {useToast} from 'vue-toastification'

import axios from 'axios'
import * as consts from '@/js/constants'

export default {
  name: 'PracticeView',
  components: {
    LessonRunner
  },
  data() {
    return {
      is_parameters_select_disabled: false,
      // Google sheet -related fields
      selected_gsheet: null,
      gsheets: [],
      gsheets_loading: true,
      // Category-related fields
      selected_category: null,
      categories: [],
      categories_loading: false,
      // Category key for the words filtering
      selected_category_key: null,
      category_keys: [],
      category_key_loading: false,
      select_latest_words: false,
      // Number of the words
      selected_number: consts.kDefaultWordNumberChoices[0],
      numbers: consts.kDefaultWordNumberChoices,
      // Language
      languages: [consts.Column.ENGLISH, consts.Column.SPANISH],
      selected_language: consts.Column.ENGLISH,
      // Checkbox for lesson type
      practice_type: consts.PracticeType.TRANSLATE_WORDS_WRITING,
      practices: consts.PracticesList,
      // Words to repeat during the lesson
      words_loading: false,
      is_lesson_complete: false,


      //!
      translate: {
        from: 'en',
        to: 'es'
      },
      lesson_data: []
    }
  },
  async mounted() {
    await this.getSpreadsheets()
  },
  // Object, required to minitor the state of the elements on the page
  watch: {
    selected_gsheet: function () {
      // Drop all child inputs
      this.selected_category = null
      this.selected_category_key = null

      this.getThemes()
    },
    selected_category: function () {
      // Drop all child inputs
      this.selected_category_key = null

      this.getSubThemes()
    },
    selected_category_key: function () {
      if (this.selected_category_key == null || this.selected_category_key.length === 0) {
        this.select_latest_words = false
        return
      }

      if (this.select_latest_words && this.selected_category_key.length > 1) {
        const index = this.selected_category_key.indexOf(consts.kLatestWordsTag)
        if (index !== -1) {
          this.selected_category_key.splice(index, 1)
        }
        this.select_latest_words = false
      }
    },
    selected_language: function () {
      if (this.selected_language === consts.Column.ENGLISH) {
        this.translate.from = 'en'
        this.translate.to = 'es'
      } else {
        this.translate.from = 'es'
        this.translate.to = 'en'
      }
    }
  },
  computed: {
    isAllCategoriesSelected() {
      if (this.selected_category_key == null || this.category_keys.length === 0)
        return false
      return this.selected_category_key.length === this.category_keys.length
    }
  },
  methods: {
    // Data getters
    async getSpreadsheets() {
      axios
          .get(`${consts.kBaseUrl}/api/spreadsheet/titles/`)
          .then(response => (this.gsheets = response.data))
          .catch(error => (this.showErrorToast(error)))
          .finally(() => (this.gsheets_loading = false))
    },
    async getThemes() {
      if (this.gsheets.length === 0)
        return

      if (this.gsheets.includes(this.selected_gsheet)) {
        this.categories_loading = true
        axios
            .get(`${consts.kBaseUrl}/api/worksheet/columns/`, {
              params: {
                title: this.selected_gsheet
              }
            })
            .then(response => (this.categories = response.data))
            .catch(error => (this.showErrorToast(error)))
            .finally(() => (this.categories_loading = false))
      }
    },
    async getSubThemes() {
      if (this.gsheets.length === 0 || this.categories.length === 0)
        return

      // Get IDs of all themes
      let ids = []
      Object.entries(this.categories).forEach(([_, value]) => {
        ids.push(value.id)
      })

      if (ids.includes(this.selected_category)) {
        this.category_key_loading = true
        axios
            .get(`${consts.kBaseUrl}/api/worksheet/colums/unique_values/`, {
              params: {
                title: this.selected_gsheet,
                column_id: this.selected_category
              }
            })
            .then(response => (this.category_keys = response.data))
            .catch(error => (this.showErrorToast(error)))
            .finally(() => (this.category_key_loading = false))
      }
    },
    async getWords() {
      if (!this.isPreRequestRequirementsSatisfied(true, true, true))
        return

      // Prepare for the new lesson
      this.is_parameters_select_disabled = true

      this.words_loading = true
      const api_tail = this.select_latest_words ? 'latest_values' : 'random_values'
      axios
          .get(`${consts.kBaseUrl}/api/worksheet/${api_tail}/`, {
            params: {
              title: this.selected_gsheet,
              filter_column_id: this.selected_category,
              template: this.selected_category_key.join('|'),
              column_ids: '0,1',
              count: this.selected_number
            }
          })
          .then(response => {
            this.formLessonData(response.data)
          })
          .catch(error => (this.showErrorToast(error)))
          .finally(() => (this.words_loading = false))
    },
    // Emit handlers
    handleFinishLesson() {
      this.is_parameters_select_disabled = false
    },
    // Helper functions
    isCategoriesEmpty() {
      return this.selected_category_key ? this.selected_category_key.length === 0 : true
    },
    formLessonData(response) {
      // TODO: here adjust the current response behaviour
      this.lesson_data = []
      if (this.practice_type === consts.PracticeType.TRANSLATE_WORDS_WRITING) {
        const length = response[0].length
        for (let i = 0; i < length; ++i) {
          this.lesson_data.push({
            es: response[0][i].trim(),
            en: response[1][i].trim(),
            exercise_type: consts.ExerciseType.TRANSLATE_SINGLE_WORD
          })
        }
      } else {
        const length = response[0].length
        let content = {
          word_translation: [],
          exercise_type: consts.ExerciseType.TRANSLATE_WORDS_ORAL
        }

        for (let i = 0; i < length; ++i) {
          content.word_translation.push({
            es: response[0][i].trim(),
            en: response[1][i].trim(),
            // Extra tags required for the lesson
            icon: consts.WordStatusMdiIcon.REMEMBERED,
            color: consts.Color.GOOD,
            user_knows_translation: true
          })
        }

        this.lesson_data = [content]
      }
    },
    isPreRequestRequirementsSatisfied(need_topic = false, need_theme = false, need_sub_theme = false) {
      if (need_topic && this.selected_gsheet === null) {
        useToast().info(consts.kInputDataIsMissed + 'google sheet')
        return false
      }
      if (need_theme && this.selected_category === null) {
        useToast().info(consts.kInputDataIsMissed + 'words filtering key')
        return false
      }
      if (need_sub_theme && (this.selected_category_key === null || this.selected_category_key.length === 0)) {
        useToast().info(consts.kInputDataIsMissed + 'words category')
        return false
      }

      return true
    },
    showErrorToast(error) {
      console.log(error)

      if (error.response.status === 401) {
        useToast().info(consts.kLoggedOutMessage)
        setTimeout(() => {
          this.$router.push('/login')
        }, consts.kRedirectToLoginPageTime)
      } else {
        useToast().error(consts.kServerNotRespondError)
      }
    },
    selectAll() {
      if (this.selected_category_key == null || this.selected_category_key.length !== this.category_keys.length) {
        this.selected_category_key = [...this.category_keys]
      } else {
        this.selected_category_key = []
      }
    },
    selectLatest() {
      if (!this.select_latest_words) {
        this.selected_category_key = [consts.kLatestWordsTag]
      } else {
        const index = this.selected_category_key.indexOf(consts.kLatestWordsTag)
        if (index !== -1) {
          this.selected_category_key.splice(index, 1)
        }
      }
      this.select_latest_words = !this.select_latest_words
    }
  }
}
</script>

<style scoped>

.my-button {
  min-width: 256px;
}

.parameters-column {
  min-width: 360px;
  max-width: 400px;
}

</style>