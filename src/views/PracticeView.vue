<template>

  <!-- MAIN PAGE CONTENT -->
  <v-row :class="top_class">

    <!--    MAIN LESSON PARAMETERS    -->
    <v-col class="grow d-flex flex-column flex-nowrap" xs="12" md="4">
      <v-row cols="12" align="end" justify="center">
        <v-list>
          <!--    GOOGLE SHEET    -->
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip text="Select the google sheet to retrieve words" location="bottom">
                <template v-slot:activator="{ props }" >
                    <v-icon icon="mdi-google-spreadsheet" size="x-large" v-bind="props" />
                </template>
              </v-tooltip>
            </template>
              <v-combobox
                  label="Choose the google sheet..."
                  v-model="selected_gsheet"
                  :items="gsheets"
                  :loading="gsheets_loading"
                  :clearable="true"
                  append-icon
                  :disabled="is_parameters_select_disabled"
                  :hide-details="true"
                  variant="outlined"
                  class="my-2" />
          </v-list-item>

          <!--  CATEGORY  -->
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip text="Category for further words filtering" location="bottom">
                <template v-slot:activator="{ props }" >
                    <v-icon icon="mdi-shape-outline" size="x-large" v-bind="props" />
                </template>
              </v-tooltip>
            </template>
              <v-autocomplete
                  label="Choose filtering category..."
                  v-model="selected_category"
                  :items="categories"
                  item-title="text"
                  item-value="id"
                  :loading="categories_loading"
                  :clearable="true"
                  append-icon
                  :disabled="is_parameters_select_disabled"
                  :hide-details="true"
                  variant="outlined"
                  class="my-2" />
          </v-list-item>

          <!--  SUB THEME  -->
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip text="Sub-category for further words filtering" location="bottom">
                <template v-slot:activator="{ props }" >
                    <v-icon icon="mdi-shape-plus" size="x-large" v-bind="props" />
                </template>
              </v-tooltip>
            </template>
              <v-autocomplete
                  label="Choose the sub-category..."
                  v-model="selected_category_key"
                  :items="category_keys"
                  :loading="category_key_loading"
                  :clearable="true"
                  append-icon
                  :disabled="is_parameters_select_disabled"
                  multiple
                  hide-details="true"
                  variant="outlined"
                  class="my-2" />
          </v-list-item>

          <!--    LANGUAGE      -->
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip text="Original language to translate from" location="bottom">
                <template v-slot:activator="{ props }" >
                    <v-icon icon="mdi-translate" size="x-large" v-bind="props" />
                </template>
              </v-tooltip>
            </template>
              <v-autocomplete
                  label="Choose the original language..."
                  v-model="selected_language"
                  :items="languages"
                  :clearable="true"
                  append-icon
                  :disabled="is_parameters_select_disabled"
                  :hide-details="true"
                  variant="outlined"
                  class="my-2" />
          </v-list-item>

          <!--  NUMBER OF WORDS TO REPEAT  -->
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip text="Number of words to repeat" location="bottom">
                <template v-slot:activator="{ props }" >
                    <v-icon icon="mdi-counter" size="x-large" v-bind="props" />
                </template>
              </v-tooltip>
            </template>
              <v-combobox
                label="Select the number of words to repeat..."
                v-model="selected_number"
                :items="numbers"
                :clearable="true"
                :disabled="is_parameters_select_disabled"
                variant="outlined"
                :hide-details="true"
                class="my-2" />
          </v-list-item>

          <!--  TYPE OF SELF CHECK  -->
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip text="Disable if you want the app to check each word translation you type" location="bottom">
                <template v-slot:activator="{ props }" >
                    <v-icon icon="mdi-draw" size="x-large" v-bind="props" />
                </template>
              </v-tooltip>
            </template>
              <v-checkbox
                  label="Do manual word translations check"
                  v-model="check_by_typing"
                  :disabled="is_parameters_select_disabled"
                  variant="outlined"
                  :hide-details="true"
                  class="my-2" />
          </v-list-item>
        </v-list>
      </v-row>

      <!--    START LESSON BUTTON    -->
      <v-row cols="12" align="end" justify="center">
        <v-btn
            rounded="lg"
            size="large"
            class="text-uppercase my-1 my-button"
            text="start"
            @click="getWords"/>
      </v-row>
    </v-col>


<!--    <v-divider :vertical="true"></v-divider>-->

    <v-col class="grow d-flex flex-column flex-nowrap" xs="12" md="7" >
      <!--    AREA WITH WORDS    -->
      <v-row cols="12">

        <!--   LESSON AREA       -->
        <v-card v-if="!is_lesson_complete" elevation="0" width="100%">
          <v-card-item>
            <v-card-title>
              Words to repeat
            </v-card-title>
            <v-card-subtitle>
              Please, click on the words that you don't remember, so you can see their translation,
              after completing the practice.
            </v-card-subtitle>
          </v-card-item>
        </v-card>
        <v-card v-if="!is_lesson_complete && check_by_typing" elevation="0" width="100%">
          <v-card-text>
            <v-col cols="12">
              <v-row cols="12" justify="center">
                <v-progress-circular v-if="words_loading" class="align-center justify-center" indeterminate />
                <v-chip
                    v-else
                    v-for="item in words[selected_language]"
                    :prepend-icon="item.icon"
                    class="ma-1"
                    :color="item.color"
                    size="large"
                    @click="updateWordStatus(item)"
                    >{{item.word}}</v-chip>
              </v-row>
            </v-col>
          </v-card-text>
        </v-card>
        <v-card v-if="!is_lesson_complete && !check_by_typing" elevation="0" width="100%">
          <v-card-text>
            <v-container>
              <v-row cols="12" v-if="words_loading" justify="center">
                <v-progress-circular class="align-center justify-center" indeterminate />
              </v-row>
              <div v-if="!words_loading && Object.keys(words).length !== 0">
                <v-row cols="12" align-content="center" >
                  <p class="my-2 text-h6">Your progress: {{ Math.round(current_word_id / words_queue.length * 100) }} %</p>
                  <v-progress-linear
                      v-model="current_word_id"
                      :max="words_queue.length"
                      :height="12"
                      rounded class="pa-0 mb-10"
                      color="green"></v-progress-linear>
                </v-row>
                <v-row cols="12" justify="center" align="center">
                  <v-card rounded="lg" class="pa-5" width="400">
                    <v-text-field
                        label="Original"
                        variant="outlined"
                        v-model="current_word_to_check"
                        :readonly="true"
                    ></v-text-field>
                    <v-form validate-on="submit lazy" @submit.prevent="checkTranslation">
                      <v-text-field
                          v-model="current_user_input"
                          :persistent-hint="true"
                          label="Translation..."
                          variant="outlined"
                          @keyup.enter="checkTranslation"
                          :readonly="post_validation_lock"
                          :error="!is_user_input_correct"
                          :error-messages="current_error_message"
                          :messages="current_message"
                      ></v-text-field>
                    </v-form>
                    <v-card-actions class="align-center justify-center">
                      <v-btn
                          rounded="lg"
                          size="large"
                          class="text-uppercase mt-1 my-button"
                          text="NEXT"
                          @click="getNextWord" />
                    </v-card-actions>
                  </v-card>
                </v-row>
              </div>
            </v-container>
          </v-card-text>
        </v-card>

        <!--   AREA WITH FORGOTTEN WORDS       -->
        <v-card v-if="is_lesson_complete && forgotten_words.length !== 0" elevation="0" class="w-100">

          <v-card-item>
            <v-card-title>
              Forgotten words
            </v-card-title>

            <v-card-subtitle>
              Here are words for you to repeat to get all five stars next time!
            </v-card-subtitle>
          </v-card-item>
        </v-card>
        <v-card v-if="is_lesson_complete && forgotten_words.length !== 0" elevation="0" class="w-100" max-height="400px">
          <v-card-text>
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
                <tr v-for="item in forgotten_words">
                  <td class="text-center">{{ item }}</td>
                  <td class="text-center">{{ word_to_translation_pairs.get(item) }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-row>

      <!--    COMPLETE BUTTON    -->
      <v-row cols="12" align="end" justify="center">
        <v-btn
            v-if="!is_lesson_complete && Object.keys(words).length !== 0"
            rounded="lg"
            size="large"
            class="text-uppercase my-1 my-button"
            @click="onCompleteClick"
        >complete</v-btn>
      </v-row>
    </v-col>
  </v-row>

  <!-- ON LESSON COMPLETE CONTENT -->
  <v-overlay v-model="overlay" :contained="true" class="align-center justify-center">
    <v-card rounded="lg" width="360">

      <v-card-item>
        <v-card-title>
          <div class="d-flex justify-center mt-auto text-h5">Lesson complete!</div>
        </v-card-title>
      </v-card-item>

      <v-card-text>
        <div class="d-flex flex-column align-center">
          <v-icon :icon="lesson_icon" style="font-size: 250px;" :color="lesson_color"></v-icon>
          <div class="text-h2 mt-5">
            {{success_percent}}
            <span class="text-h6 ml-n3">/5</span>
          </div>
          <v-rating
            v-model="success_percent"
            color="yellow-darken-3"
            :half-increments="true"
            :readonly="true"
        ></v-rating>
          <p class="px-3 text-subtitle-1 text-center">
            Great job! <br/> {{generateUserMessageOnLessonComplete()}}
          </p>
        </div>
      </v-card-text>

      <v-card-actions class="align-center justify-center">
        <v-btn
            @click="onLessonComplete"
            class="text-uppercase my-1 my-button"
            rounded="lg"
            size="large"
        >done</v-btn>
      </v-card-actions>
    </v-card>
  </v-overlay>

</template>

<script>
import axios from 'axios'
import { useToast } from 'vue-toastification'

import * as consts from '@/js/constants'

export default {
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
      // Number of the words
      selected_number: consts.kDefaultWordNumberChoices[0],
      numbers: consts.kDefaultWordNumberChoices,
      // Checkbox for lesson type
      check_by_typing: true,
      // Language
      languages: [consts.Column.ENGLISH, consts.Column.SPANISH],
      selected_language: consts.Column.ENGLISH,
      // Words to repeat during the lesson
      words: {},
      forgotten_words: [],
      words_loading: false,
      word_to_translation_pairs: new Map(),

      // Fields required for the lesson type: type the words
      // TODO: make words queue: Queue type
      words_queue: [],
      current_word_id: 0,
      current_word_to_check: null,
      current_user_input: null,
      // Lock the possibility to change user input after submit
      post_validation_lock: false,
      is_user_input_correct: true,
      // Error message, used to show incorrect user input
      current_error_message: '',
      // Success message, used to show correct user input
      current_message: '',

      // Post-complete lesson
      // Percent of correct responses in range [0, 1]
      success_percent: 0,
      overlay: false,
      is_lesson_complete: false,
      lesson_icon: null,
      lesson_color: null,

      // TODO: re-make. Now this handles the size of window on xm screen
      window: {
            width: 0,
            height: 0
      },
      top_class: ''
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  async beforeMount() {
    // Upload the list of all possible spreadsheets
    axios
        .get(`${consts.kBaseUrl}/api/spreadsheet/titles/`)
        .then(response => (this.gsheets = response.data))
        .catch(error => (this.showErrorToast(error)))
        .finally(() => (this.gsheets_loading = false))
  },
  // Object, required to minitor the state of the elements on the page
  watch: {
    selected_gsheet : function () {
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
    window: {
      handler() {
        this.top_class = this.window.width < 600 ? 'flex-column' : ''
      },
      deep: true
    }
  },
  methods: {
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
      Object.entries(this.categories).forEach(([_, value]) => { ids.push(value.id)})

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
      if(!this.isPreRequestRequirementsSatisfied(true, true, true))
        return

      // Prepare for the new lesson
      this.cleanUpLessonData()
      this.is_parameters_select_disabled = true

      this.words_loading = true
      axios
          .get(`${consts.kBaseUrl}/api/worksheet/random_values/`, {
            params: {
              title: this.selected_gsheet,
              filter_column_id: this.selected_category,
              template: this.selected_category_key.join('|'),
              column_ids: '0,1',
              count: this.selected_number
            }
          })
          .then(response => {
            // Parse words to make chips from them
            // TODO: on the backend side put everything to the dict {word, translation, color, icon}
            for(const [key, value] of Object.entries(response.data)) {
              const column = parseInt(key) === 0 ? consts.Column.SPANISH : consts.Column.ENGLISH
              this.words[column] = value.map((v) => ({ word: v, color: consts.Color.GOOD, icon: 'mdi-emoticon' }))
            }

            // Create map for translation: <word> - <translation>
            const key_column = this.selected_language === consts.Column.SPANISH ? 0 : 1
            const value_column = key_column === 1 ? 0 : 1
            const length = response.data[key_column].length
            for(let i = 0; i < length; ++i) {
              this.word_to_translation_pairs.set(response.data[key_column][i], response.data[value_column][i])
            }

            if (!this.check_by_typing) {
              this.words_queue = [...response.data[key_column]]
              this.forgotten_words = [...response.data[key_column]]
              this.current_word_to_check = this.words_queue[this.current_word_id]
            }
          })
          .catch(error => (this.showErrorToast(error)))
          .finally(() => (this.words_loading = false))
    },
    // Forgotten words
    updateWordStatus(item) {
      const word = item.word

      const index = this.forgotten_words.indexOf(word)
      if (index !== -1) {
        this.forgotten_words.splice(index, 1)
      } else {
        this.forgotten_words.push(word)
      }

      item.color = item.color === consts.Color.GOOD ? consts.Color.BAD : consts.Color.GOOD
      item.icon = item.icon === consts.WordStatusMdiIcon.REMEMBERED ?
          consts.WordStatusMdiIcon.FORGOTTEN :
          consts.WordStatusMdiIcon.REMEMBERED
    },
    // Results
    onCompleteClick(){
      // Calculate percent of correct answers
      const numerator = this.word_to_translation_pairs.size - this.forgotten_words.length
      const denominator = this.word_to_translation_pairs.size
      this.success_percent = (numerator / denominator).toFixed(1) * consts.kMaxRating

      // Generate visual lesson results
      const percent = this.success_percent / consts.kMaxRating * 100
      const data = this.chooseLessonIcons(percent)
      this.lesson_icon = data.icon
      this.lesson_color = data.color

      this.overlay=true
    },
    onLessonComplete() {
      this.overlay = !this.overlay
      this.is_lesson_complete = true
      this.is_parameters_select_disabled = false
    },
    generateUserMessageOnLessonComplete(){
      const percent = this.success_percent / consts.kMaxRating * 100.
      const intro = `You remember ${percent}% of the words.`
      if (percent > consts.MinSuccessThresholds.GOOD) {
        return intro + consts.LessonResultMessages.GOOD
      } else if (percent > consts.MinSuccessThresholds.MEDIUM) {
        return intro + consts.LessonResultMessages.MEDIUM
      }
      return intro + consts.LessonResultMessages.BAD
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
    cleanUpLessonData(){
      // Clean-up for the first type of the lesson: without typing
      this.words = {}
      this.forgotten_words = []
      this.word_to_translation_pairs.clear()
      this.is_lesson_complete = false

      // Clean up for the second type of the lesson: with typing
      this.words_queue = []
      this.current_word_id = 0
      this.current_word_to_check = null
      this.current_user_input = null
      this.post_validation_lock = false
      this.is_user_input_correct = true
      this.current_error_message = ''
      this.current_message = ''
    },
    chooseLessonIcons(success){
      if(success > consts.MinSuccessThresholds.GOOD) {
        return { icon: consts.LessonResultMdiIcon.GOOD, color: consts.Color.GOOD}
      }
      if (success > consts.MinSuccessThresholds.MEDIUM) {
        return { icon: consts.LessonResultMdiIcon.MEDIUM, color: consts.Color.MEDIUM}
      }
      return { icon: consts.LessonResultMdiIcon.BAD, color: consts.Color.BAD}
    },
    transformWord(str){
      // Make user intput lowercase and remove accents
      return str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    },
    checkTranslation() {
      // TODO: On the second 'enter' input we go to the next word
      const expected = this.word_to_translation_pairs.get(this.current_word_to_check)
      this.is_user_input_correct = this.transformWord(this.current_user_input) === this.transformWord(expected)

      if (this.is_user_input_correct) {
        const index = this.forgotten_words.indexOf(this.current_word_to_check)
        if (index !== -1) {
          this.forgotten_words.splice(index, 1)
        }
      }

      this.post_validation_lock = true
      if (!this.is_user_input_correct) {
        this.current_error_message = `Sorry, expected translation: ${expected}`
      } else {
        this.current_message = 'Great job!'
      }
    },
    getNextWord() {
      // If there was no translation check: do it first
      if (!this.post_validation_lock) {
        this.checkTranslation()
        return
      }

      // Check if this was the last word and the game is complete
      if (this.current_word_id === this.words_queue.length - 1) {
        this.onCompleteClick()
        return
      }

      // Go to the next word
      this.current_word_id++
      this.current_word_to_check = this.words_queue[this.current_word_id]

      this.current_user_input = ''
      this.is_user_input_correct = ''
      this.current_error_message = ''
      this.current_message = ''

      this.is_user_input_correct = true
      this.post_validation_lock = false
    },
    showErrorToast(error) {
      console.log(error)

      if (error.response.status === 401) {
        useToast().info(consts.kLoggedOutMessage)
        setTimeout(() => { this.$router.push('/login') }, consts.kRedirectToLoginPageTime)
      }
      else {
        useToast().error(consts.kServerNotRespondError)
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },
    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    }
  }
}
</script>

<style scoped>
.my-button {
  min-width: 256px;
}
</style>