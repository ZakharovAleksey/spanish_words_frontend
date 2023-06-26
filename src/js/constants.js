export const Column = { ENGLISH: 'English', SPANISH: 'Spanish' }
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

export const kServerNotRespondError = 'Could not fetch the data: server does not respond.\nPlease, try again later...'
export const kLoggedOutMessage = `Your credentials have been expired. \n You will be re-directed to the login page in ${kRedirectToLoginPageTime/1000} sec.`
export const kInputDataIsMissed = 'Required input field is missed: '


export const kBaseUrl = 'https://spanish-words-backend.vercel.app'