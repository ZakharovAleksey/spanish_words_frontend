<template>

  <!-- MAIN PAGE CONTENT -->
  <v-row>

    <!--    MAIN LESSON PARAMETERS    -->
    <v-col class="grow d-flex flex-column flex-nowrap" sm="12" md="4">
      <v-row cols="12" align="end" justify="center">
        <v-list>
          <!--    TOPIC    -->
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip text="Select the google sheet to retrieve words" location="bottom">
                <template v-slot:activator="{ props }" >
                    <v-icon icon="mdi-google-spreadsheet" size="x-large" v-bind="props" />
                </template>
              </v-tooltip>
            </template>
              <v-combobox
                  label="Choose the general topic..."
                  v-model="selected_topic"
                  :items="topics"
                  :loading="topic_loading"
                  clearable
                  append-icon
                  hide-details="true"
                  variant="outlined"
                  class="my-2" />
          </v-list-item>

          <!--  THEME  -->
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip text="Category for further words filtering" location="bottom">
                <template v-slot:activator="{ props }" >
                    <v-icon icon="mdi-shape-outline" size="x-large" v-bind="props" />
                </template>
              </v-tooltip>
            </template>
              <v-autocomplete
                  label="Choose the general topic..."
                  v-model="selected_theme"
                  :items="themes"
                  item-title="text"
                  item-value="id"
                  :loading="theme_loading"
                  clearable
                  append-icon
                  hide-details="true"
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
                  v-model="selected_sub_theme"
                  :items="sub_themes"
                  :loading="sub_theme_loading"
                  clearable
                  append-icon
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
                  clearable
                  append-icon
                  hide-details="true"
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
                clearable
                variant="outlined"
                hide-details="true"
                class="my-2" />
          </v-list-item>

          <!--  TYPE OF SELF CHECK  -->
          <v-list-item>
            <template v-slot:prepend>
              <v-tooltip text="Enable, if you want to check yourself on the paper" location="bottom">
                <template v-slot:activator="{ props }" >
                    <v-icon icon="mdi-draw" size="x-large" v-bind="props" />
                </template>
              </v-tooltip>
            </template>
              <v-checkbox
                  label="Do words self-check words on the paper"
                  v-model="check_by_typing"
                  variant="outlined"
                  hide-details="true"
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

    <v-divider vertical></v-divider>

    <v-col class="grow d-flex flex-column flex-nowrap" sm="12" md="8" >

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
        <v-card v-if="!is_lesson_complete" elevation="0" width="100%">
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

        <!--   AREA WITH FORGOTTEN WORDS       -->
        <v-card v-if="is_lesson_complete" elevation="0" class="w-100">

          <v-card-item>
            <v-card-title>
              Forgotten words
            </v-card-title>

            <v-card-subtitle>
              Here are words for you to repeat to get all five stars next time!
            </v-card-subtitle>
          </v-card-item>
        </v-card>
        <v-card v-if="is_lesson_complete" elevation="0" class="w-100" max-height="400px">
          <v-card-text>
            <v-list>
                <v-list-item v-for="item in forgotten_words">
                  <v-row cols="12" align="center">
                    <v-col cols="6" align="center">
                      <v-chip class="ma-1 w-75 justify-center" size="large">
                        {{item}}
                      </v-chip>
                    </v-col>
                    <v-col cols="6" align="center">
                      <v-chip class="mx-1 w-75 justify-center" size="large">
                        <span>
                          {{this.word_to_translation_pairs.get(item)}}
                        </span>
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-list-item>
              </v-list>

          </v-card-text>
        </v-card>
      </v-row>

      <!--    COMPLETE BUTTON    -->
      <v-row cols="12" align="end" justify="center">
        <v-btn
          rounded="lg"
          size="large"
          class="text-uppercase my-1 my-button"
          @click="onCompleteClick"
        >complete</v-btn>
      </v-row>
    </v-col>
  </v-row>

  <!-- ON LESSON COMPLETE CONTENT -->
  <v-overlay v-model="overlay" contained class="align-center justify-center">
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
            half-increments
            readonly
        ></v-rating>
          <p class="px-3 text-subtitle-1 text-center">
            Great job! <br/> You remember {{success_percent / 5 * 100}} % of the words, are you sure, you need this practice?)
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

// Sort of enum. TODO: move the the constants file with all related methods
const Column = { ENGLISH: 'English', SPANISH: 'Spanish' }
const MinSuccessThresholds = { GOOD: 80, MEDIUM: 40 }
const Color = { GOOD: 'green', MEDIUM: 'yellow', BAD: 'red' }
const WordStatusMdiIcon = { REMEMBERED: 'mdi-emoticon', FORGOTTEN: 'mdi-emoticon-cry' }
const LessonResultMdiIcon = {GOOD: 'mdi-robot-happy-outline', MEDIUM: 'mdi-meditation', BAD: 'mdi-emoticon-poop'}

const kMaxRating = 5
const kServerNotRespondError = 'Could not fetch the data: server does not respond.\nPlease, try again later...'
const kInputDataIsMissed = 'Required input field is missed: '

export default {
  data() {
    return {
      // Topic
      selected_topic: null,
      topics: [],
      topic_loading: true,
      // Theme
      selected_theme: null,
      themes: [],
      theme_loading: false,
      // Sub-theme
      selected_sub_theme: null,
      sub_themes: [],
      sub_theme_loading: false,
      // Number of the words
      selected_number: 25,
      numbers: [10, 25, 50],
      // Checkbox
      check_by_typing: true,
      // Language
      languages: [Column.ENGLISH, Column.SPANISH],
      selected_language: Column.ENGLISH,
      // Words to repeat
      words: {},
      forgotten_words: [],
      words_loading: false,
      word_to_translation_pairs: new Map(),
      // Post-complete lesson
      success_percent: 0,
      overlay: false,
      is_lesson_complete: false,
      lesson_icon: null,
      lesson_color: null,
    }
  },
  async beforeMount() {
    // Upload the list of all possible spreadsheets
    axios
        .get('/api/spreadsheet/titles/')
        .then(response => (this.topics = response.data))
        .catch(error => {
          useToast().error(kServerNotRespondError)
          console.log(error)
        })
        .finally(() => (this.topic_loading = false))
  },
  // Object, required to minitor the state of the elements on the page
  watch: {
    selected_topic : function (oldVal, newVal) {
      // Drop all child inputs
      this.selected_theme = null
      this.selected_sub_theme = null

      this.getThemes()
    },
    selected_theme: function (oldVal, newVal) {
      // Drop all child inputs
      this.selected_sub_theme = null

      this.getSubThemes()
    },
  },
  methods: {
    async getThemes() {
      if (this.topics.length === 0)
        return

      if (this.topics.includes(this.selected_topic)) {
        this.theme_loading = true
        axios
            .get(`/api/worksheet/columns/?title=${this.selected_topic}`)
            .then(response => (this.themes = response.data))
            .catch(error => {
              useToast().error(kServerNotRespondError)
              console.log(error)
            })
            .finally(() => (this.theme_loading = false))
      }
    },
    async getSubThemes() {
      if (this.topics.length === 0 || this.themes.length === 0)
        return

      // Get IDs of all themes
      let ids = []
      Object.entries(this.themes).forEach(([key, value]) => { ids.push(value.id)})

      if (ids.includes(this.selected_theme)) {

        // TODO: FIX THE URL PATH
        this.sub_theme_loading = true
        axios
            .get(`/api/worksheet/colums/unique_values/?title=${this.selected_topic}&column_id=${this.selected_theme}`)
            .then(response => (this.sub_themes = response.data))
            .catch(error => {
              useToast().error(kServerNotRespondError)
              console.log(error)
            })
            .finally(() => (this.sub_theme_loading = false))
      }
    },
    async getWords() {
      if(!this.isPreRequestRequirementsSatisfied(true, true, true))
        return

      this.cleanUpLessonData()

      this.words_loading = true
      const url = `/api/worksheet/random_values?title=${this.selected_topic}&filter_column_id=${this.selected_theme}&template=${this.selected_sub_theme}&column_ids=0,1&count=${this.selected_number}`
      axios
          .get(url)
          .then(response => {
            // Parse words to make chips from them
            // TODO: on the backend side put everything to the dict {word, translation, color, icon}
            for(const [key, value] of Object.entries(response.data)) {
              const column = parseInt(key) === 0 ? Column.SPANISH : Column.ENGLISH
              this.words[column] = value.map((v) => ({ word: v, color: 'green', icon: 'mdi-emoticon' }))
            }

            const key_column = this.selected_language === Column.SPANISH ? 0 : 1
            const value_column = key_column === 1 ? 0 : 1
            const length = response.data[key_column].length
            for(let i = 0; i < length; ++i) {
              this.word_to_translation_pairs.set(response.data[key_column][i], response.data[value_column][i])
            }
          })
          .catch(error => {
            useToast().error(kServerNotRespondError)
            console.log(error)
          }).finally(() => (this.words_loading = false))
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

      item.color = item.color === Color.GOOD ? Color.BAD : Color.GOOD
      item.icon = item.icon === WordStatusMdiIcon.REMEMBERED ?
          WordStatusMdiIcon.FORGOTTEN :
          WordStatusMdiIcon.REMEMBERED
    },
    // Results
    onCompleteClick(){
      // Calculate percent of correct answers
      const numerator = this.word_to_translation_pairs.size - this.forgotten_words.length
      const denominator = this.word_to_translation_pairs.size
      this.success_percent = (numerator / denominator).toFixed(1) * kMaxRating

      // Generate visual lesson results
      const percent = this.success_percent / kMaxRating * 100
      const data = this.chooseLessonIcons(percent)
      this.lesson_icon = data.icon
      this.lesson_color = data.color

      this.overlay=true
    },
    onLessonComplete() {
      this.overlay = !this.overlay
      this.is_lesson_complete = true
    },
    isPreRequestRequirementsSatisfied(need_topic = false, need_theme = false, need_sub_theme = false) {
      if (need_topic && this.selected_topic === null) {
        useToast().info(kInputDataIsMissed + 'google sheet')
        return false
      }
      if (need_theme && this.selected_theme === null) {
        useToast().info(kInputDataIsMissed + 'words filtering key')
        return false
      }
      if (need_sub_theme && this.selected_sub_theme === null) {
        useToast().info(kInputDataIsMissed + 'words category')
        return false
      }

      return true
    },
    cleanUpLessonData(){
      this.words = {}
      this.forgotten_words = []
      this.word_to_translation_pairs.clear()
      this.is_lesson_complete = false
    },
    chooseLessonIcons(success){
      if(success > MinSuccessThresholds.GOOD) {
        return { icon: LessonResultMdiIcon.GOOD, color: Color.GOOD}
      }
      if (success > MinSuccessThresholds.MEDIUM) {
        return { icon: LessonResultMdiIcon.MEDIUM, color: Color.MEDIUM}
      }
      return { icon: LessonResultMdiIcon.BAD, color: Color.BAD}
    }
  }
}
</script>

<style scoped>
.my-button {
  min-width: 256px;
}
</style>