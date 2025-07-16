class ToDoPage {
    // Page header element
    private header: string = 'header > h1';

    // ToDo items list and related controls
    private newToDo: string = '[class="new-todo"]';
    private toggleAll: string = '[class="toggle-all-label"]';
    private toDoList: string = '[class="todo-list"]';
    private allTasks: string = '[class="view"]';
    private completedTasks: string = '[class="completed"]';
    private markAllTasksCompleted: string = '[class="toggle"]';
    private deleteItemButton: string = '[class="destroy"]';

    // Footer elements
    private toDoFooter: string = '[class="footer"]';
    private toDoCount: string = '[class="todo-count"]';
    private clearCompletedButton = '[class="clear-completed"]';
    private filters: string = 'footer > ul > li > a';

    // Info message
    private info: string = '[class="info"]';

    getPageHeader() {
        return cy.get(this.header);
    }
}
export default ToDoPage;