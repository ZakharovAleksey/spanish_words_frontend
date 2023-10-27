export const Column = { ENGLISH: 'English', SPANISH: 'Spanish' }

/**
 * Possible types of the lesson (consists from one or more exercises)
 * @constant
 * @type Object
 */
export const PracticeType = {
    TRANSLATE_WORDS_WRITING: 'translate_words_writing',
    TRANSLATE_WORDS_ORAL: 'translate_words_oral',
    COMPLEX: 'complex'
}

/**
 * Possible types of exercises.
 * There could be exercises for one word, but could be exercises for several words practice.
 * @constant
 * @type Object
 */
export const ExerciseType = {
    // Section: one word -> one exercise
    TRANSLATE_SINGLE_WORD: 'translate_single_word',
    TRANSLATE_SENTENCE: 'translate_sentence',
    FILL_GAP_IN_SENTENCE: 'fill_sentence_gap',
    CHOOSE_CORRECT_TRANSLATION: 'choose_correct_translation',
    // Section: several words -> one exercise
    TRANSLATE_WORDS_ORAL: 'translate_words_oral',
    WORDS_TRANSLATIONS_MATCH: 'words_translations_match'
}


export const MinSuccessThresholds = { GOOD: 80, MEDIUM: 40 }
export const Color = { GOOD: 'green', MEDIUM: 'yellow', BAD: 'red' }
export const WordStatusMdiIcon = { REMEMBERED: 'mdi-emoticon', FORGOTTEN: 'mdi-emoticon-cry' }
export const LessonResultMdiIcon = { GOOD: 'mdi-robot-happy-outline', MEDIUM: 'mdi-meditation', BAD: 'mdi-emoticon-poop' }
export const LessonResultMessages = {
    GOOD: 'Are you sure, you need this practice? Solo hable con otras personas ;)',
    MEDIUM: 'There is always space for improvement :)',
    BAD: 'Don\'t worry. Sure, you\'ll crush this topic next time :)'
}

export const kMaxRating = 5
export const kRedirectToLoginPageTime = 3000
export const kDefaultWordNumberChoices = [10, 25, 50]
export const kRefreshTokenTime = 25 * 60 * 1000 // 25 minutes x 60 sec x 1000 ms

export const kSecInMin = 60

export const kServerNotRespondError = 'Could not fetch the data: server does not respond.\nPlease, try again later...'
export const kLoggedOutMessage = `Your credentials have been expired. \n You will be re-directed to the login page in ${kRedirectToLoginPageTime/1000} sec.`
export const kInputDataIsMissed = 'Required input field is missed: '
export const kLatestWordsTag = 'latest'


export const kBaseUrl = 'https://spanish-words-backend.vercel.app'