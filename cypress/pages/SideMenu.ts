class SideMenu {
    private sideContainer: string = '[class="learn"]';
    private header: string = 'header > h3';
    private sourceLink: string = 'header > span > a';
    private blockQuoteText: string = 'blockquote > p';
    private blockQuoteLink: string = 'blockquote > footer > a'
    private footer: string = 'aside > footer > em';

    getSideContainer() {
        return cy.get(this.sideContainer);
    };

    getSideHeader() {
        return cy.get(this.header);
    }

    getSourceLink() {
        return cy.get(this.sourceLink);
    }

    getBlockQuoteText() {
        return cy.get(this.blockQuoteText);
    }

    getBlockQuoteLink() {
        return cy.get(this.blockQuoteLink);
    }

    getFooter() {
        return cy.get(this.footer);
    }
}
export default SideMenu;