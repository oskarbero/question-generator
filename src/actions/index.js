/** 
 * From Redux "reducing boilerplate" tutorial section
 * define every action type as a string constant:
 *
 * const ADD_TODO = 'ADD_TODO'
 * const REMOVE_TODO = 'REMOVE_TODO'
 * const LOAD_ARTICLE = 'LOAD_ARTICLE'
 * 
 * Why is this beneficial? It is often claimed that constants are unnecessary, and for small projects, this might be correct. 
 * For larger projects, there are some benefits to defining action types as constants:
 * 
 *  -> It helps keep the naming consistent because all action types are gathered in a single place.
 * 
 *  -> Sometimes you want to see all existing actions before working on a new feature. 
 *      It may be that the action you need was already added by somebody on the team, but you didn't know.
 * 
 *  -> The list of action types that were added, removed, and changed in a Pull Request helps everyone on the team 
 *      keep track of scope and implementation of new features.
 * 
 *  -> If you make a typo when importing an action constant, you will get undefined. 
 *      Redux will immediately throw when dispatching such an action, and you'll find the mistake sooner.
*/

export const QUESTION_TYPE = {
    NONE: 'NONE',
    ADR: 'ADRs',
    CATEGORY: 'CATEGORY'
}
export const SHOW_ANSWER = 'SHOW_ANSWER'
export const GENERATE_QUESTION = 'GENERATE_QUESTION'
export const RESET_QUESTION_DISPLAY = 'RESET_QUESTION_DISPLAY'
export const MAIN_MENU_CLICK = 'MAIN_MENU_CLICK'

export const mainMenuClick = id => ({ type: MAIN_MENU_CLICK, id })
export const resetQuestionDisplay = () => ({ type: RESET_QUESTION_DISPLAY })
export const generateQuestion = () => ({ type: GENERATE_QUESTION })
export const showAnswer = status => ({ type: SHOW_ANSWER, status })
