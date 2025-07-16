class SideMenu {
    private sideContainer: string = '[class="learn"]';
    private header: string = 'header > h3';
    private sourceLink: string = 'header > span > a';
    private blockquoteText: string = 'blockquote > p';
    private blockquoteLink: string = 'blockquote > footer > a'
    private footer: string = 'aside > footer > em';

    getSideContainer() {
        return cy.get(this.sideContainer);
    };
}
export default SideMenu;