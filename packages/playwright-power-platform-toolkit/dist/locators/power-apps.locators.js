"use strict";
/**
 * Power Apps Page Locators using Playwright Best Practices
 * Centralized locator management for Power Apps Maker Portal
 * Supports Canvas Apps, Model-Driven Apps, and Power Platform portal
 * Extracted and enhanced from lib/old
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerAppsPageLocators = exports.PowerAppsPageSelectors = void 0;
const base_locators_1 = require("./base.locators");
/**
 * Power Apps Page Selectors - Constant object for easy management
 * Organized by page/section for better maintainability
 */
exports.PowerAppsPageSelectors = {
    // ============ Root Elements ============
    Root: '#root',
    PageHeader: '#o365header',
    MainNavigation: '[role="navigation"][aria-label="main"]',
    // ============ Apps Page ============
    AppsPage: {
        MainContainer: '[data-test-id="PageCanvasSlot"]',
        PageContainer: '[class*="appsPageContainer"]',
        Sidebar: '[role="navigation"][aria-label="Main"]',
        CommandBar: '[role="menubar"][class*="ms-CommandBar"]',
        NewApp: 'button[role="menuitem"][name="New app"]',
        AllApps: 'button[data-test-id="All"]',
        CanvasApp: 'button[name="Canvas"]',
        ModelApp: 'button[role="menuitem"]:has-text("Model-driven")',
        PortalApp: 'button[name="Portal"]',
        EditApp: 'button[role="menuitem"][name="Edit"]',
        CanvasEditApp: 'button[role="menuitem"]:has-text("Edit")',
        DeleteApp: 'button[role="menuitem"] i[data-icon-name="Delete"]',
        AppListsGridContainer: '[data-automationid="DetailsList"]',
        AppNameContainerSelector: '[data-automationid="DetailsRowFields"]',
        AppSelector: '[role="rowheader"][aria-colindex="3"] [class*="ms-Link"]:has-text("{0}")',
        ContextualMenu: '[data-automation-key="contextualMenu"]',
    },
    // ============ Solutions Page ============
    SolutionsPage: {
        SideBar: '[class*="ba-Sidebar ba-Sidebar-"]',
        CommandBar: '[class*="command-bar"] [data-automation-id="visibleContent"]',
        SearchTextBox: '[data-automation-id="visibleContent"] [role="searchbox"]',
        SolutionsListContainer: '[data-automationid="DetailsList"]',
        ComponentTypesList: '[role="tree"] [class*="ms-List-surface"]',
        DefaultSolutionContainerGrid: '[data-automationid="DetailsList"] [role="grid"]',
        SolutionPreviewButton: '[id*="Toggle"][role="switch"]',
        SolutionSelector: '[role="rowheader"][data-automation-key="name"] [class*="ms-Link"]:has-text("{0}")',
        SolutionNewLookTeachingBubble: '[role="dialog"][class*="ms-TeachingBubble-content"]',
        SolutionNewLookTeachingBubbleCloseButton: '[aria-label="Close"][class*="ms-TeachingBubble-closebutton"]',
        SiteMapContainer: '[data-automationid="DetailsList"]',
        SiteMapNameContainer: '[role="grid"] [data-automationid="DetailsRow"]',
        SiteMapSelector: '[role="gridcell"] [role="link"][class*="ms-Link"][data-test-id="sitemap-{0}"]',
    },
    // ============ App Preview Page (Canvas Studio) ============
    AppPreviewPage: {
        CanvasAndPanes: '[class*="canvasAndPanes"]',
        CanvasAppBackStageRootComponent: '#backstage-root-component',
        CanvasAppManagementPage: '#ba-Page-main',
        CanvasPlaceholderNewPage: '[data-cy="canvasPlaceholderNewPage"]',
        CloseButton: "button[class*='ms-Button--action ms-Button--command'][class*='closeButton'][title='Close']",
        PlayButton: 'button[role="menuitem"]:has-text("Play")',
        PreviewPlaceholder: '#previewPlaceholder',
        PublishButton: 'button[role="menuitem"]:has-text("Publish")',
        SaveButton: 'button[role="menuitem"]:has-text("Save")',
    },
    // ============ Model App Page ============
    ModelAppPage: {
        ApplicationShell: '#ApplicationShell',
        AppTitle: '[data-id="appBreadCrumb"]',
        GlobalCommandBar: '[data-id="topBar"] [data-id="CommandBar"]',
        MainContent: '#mainContent',
    },
    // ============ Home Page ============
    HomePage: {
        Apps: '[aria-label="Apps"] >> text=Apps',
        MainContainer: '[class*="mainContainerStyle"]',
        MainContent: 'main[aria-label="Home page"]',
        HomePageContainer: '[class*="homePageContainer"]',
        HeaderRegion: '[role="region"][aria-label="Home page header"]',
        PlansSection: '[role="region"][aria-label="Plans"]',
        AppsSection: '[role="region"][aria-label="Apps"]',
        LearningSection: '[role="region"][aria-label="Learning for every level"]',
    },
    // ============ Teaching Bubble ============
    TeachingBubble: '[role="dialog"][class*="ms-TeachingBubble-content"]',
    TeachingBubbleCloseButton: '[class*="ms-TeachingBubble-closebutton"]',
    TeachingBubblePrimaryButton: '[role="button"].ms-TeachingBubble-primaryButton',
    // ============ Dialog & Modal ============
    ModalFocusTrapZone: "[id*='ModalFocusTrapZone']",
    DialogAcceptButton: '[data-test-id="Dialog.Accept"]',
    DialogCancelButton: '[data-test-id="Dialog.Cancel"]',
    // ============ Canvas Designer Iframe ============
    CanvasDesignerIframe: '[data-test-id="iframe-powerapps-studio"]',
    CanvasPlayerIframe: 'iframe[name="app-player"]',
    // ============ Authentication ============
    MeInitialsButton: '#meInitialsButton',
    SignOutButton: '#mectrl_body_signOut',
    SignOutLink: '#meControlSignoutLink',
    // ============ Error Page ============
    ErrorPage: {
        Container: '[data-cy="ppux-error-page"]',
        Title: 'h1:has-text("Sorry, there\'s been a disconnect")',
        Message: 'div:has-text("We can\'t find the page you\'re looking for")',
        HomeButton: 'a[href="/"]:has-text("Go to home page")',
    },
};
/**
 * Helper class to work with Power Apps selectors and return Playwright Locators
 * Provides strongly-typed access to page elements for Canvas Apps, Model-Driven Apps, etc.
 */
class PowerAppsPageLocators {
    constructor(page) {
        this.page = page;
    }
    /**
     * Get locator for a selector string
     */
    loc(selector) {
        return this.page.locator(selector);
    }
    // ============ Root Elements ============
    get root() {
        return this.loc(exports.PowerAppsPageSelectors.Root);
    }
    get pageHeader() {
        return this.loc(exports.PowerAppsPageSelectors.PageHeader);
    }
    get mainNavigation() {
        return this.loc(exports.PowerAppsPageSelectors.MainNavigation);
    }
    // ============ Home Page Locators ============
    get homePageMainContainer() {
        return this.loc(exports.PowerAppsPageSelectors.HomePage.MainContainer);
    }
    get homePageMainContent() {
        return this.loc(exports.PowerAppsPageSelectors.HomePage.MainContent);
    }
    get homePageContainer() {
        return this.loc(exports.PowerAppsPageSelectors.HomePage.HomePageContainer);
    }
    get homePageHeaderRegion() {
        return this.loc(exports.PowerAppsPageSelectors.HomePage.HeaderRegion);
    }
    get homePagePlansSection() {
        return this.loc(exports.PowerAppsPageSelectors.HomePage.PlansSection);
    }
    get homePageAppsSection() {
        return this.loc(exports.PowerAppsPageSelectors.HomePage.AppsSection);
    }
    get homePageLearningSection() {
        return this.loc(exports.PowerAppsPageSelectors.HomePage.LearningSection);
    }
    // ============ Error Page Locators ============
    get errorPageContainer() {
        return this.loc(exports.PowerAppsPageSelectors.ErrorPage.Container);
    }
    get errorPageTitle() {
        return this.loc(exports.PowerAppsPageSelectors.ErrorPage.Title);
    }
    get errorPageMessage() {
        return this.loc(exports.PowerAppsPageSelectors.ErrorPage.Message);
    }
    get errorPageHomeButton() {
        return this.loc(exports.PowerAppsPageSelectors.ErrorPage.HomeButton);
    }
    // ============ Apps Page Locators ============
    get appsPageMainContainer() {
        return this.loc(exports.PowerAppsPageSelectors.AppsPage.MainContainer);
    }
    get appsPageContainer() {
        return this.loc(exports.PowerAppsPageSelectors.AppsPage.PageContainer);
    }
    get sidebar() {
        return this.loc(exports.PowerAppsPageSelectors.AppsPage.Sidebar);
    }
    get commandBar() {
        return this.loc(exports.PowerAppsPageSelectors.AppsPage.CommandBar);
    }
    get appsPageCommandBar() {
        return this.loc(exports.PowerAppsPageSelectors.AppsPage.CommandBar);
    }
    get appListsGridContainer() {
        return this.loc(exports.PowerAppsPageSelectors.AppsPage.AppListsGridContainer);
    }
    get newAppButton() {
        return this.loc(exports.PowerAppsPageSelectors.AppsPage.NewApp);
    }
    get allAppsButton() {
        return this.loc(exports.PowerAppsPageSelectors.AppsPage.AllApps);
    }
    get canvasAppButton() {
        return this.loc(exports.PowerAppsPageSelectors.AppsPage.CanvasApp);
    }
    get modelAppButton() {
        return this.loc(exports.PowerAppsPageSelectors.AppsPage.ModelApp);
    }
    get editAppButton() {
        return this.loc(exports.PowerAppsPageSelectors.AppsPage.EditApp);
    }
    get deleteAppButton() {
        return this.loc(exports.PowerAppsPageSelectors.AppsPage.DeleteApp);
    }
    get appListGrid() {
        return this.loc(exports.PowerAppsPageSelectors.AppsPage.AppListsGridContainer);
    }
    get contextualMenu() {
        return this.loc(exports.PowerAppsPageSelectors.AppsPage.ContextualMenu);
    }
    /**
     * Get app by name using a link locator
     */
    getAppByName(appName) {
        return this.page.getByRole('link', { name: appName, exact: true });
    }
    /**
     * Get app row container by name
     */
    getAppRowByName(appName) {
        return this.loc(exports.PowerAppsPageSelectors.AppsPage.AppNameContainerSelector).filter({
            hasText: appName,
        });
    }
    // ============ Solutions Page Locators ============
    get solutionsSidebar() {
        return this.loc(exports.PowerAppsPageSelectors.SolutionsPage.SideBar);
    }
    get solutionsCommandBar() {
        return this.loc(exports.PowerAppsPageSelectors.SolutionsPage.CommandBar);
    }
    get solutionsSearchBox() {
        return this.loc(exports.PowerAppsPageSelectors.SolutionsPage.SearchTextBox);
    }
    get solutionsListContainer() {
        return this.loc(exports.PowerAppsPageSelectors.SolutionsPage.SolutionsListContainer);
    }
    get componentTypesList() {
        return this.loc(exports.PowerAppsPageSelectors.SolutionsPage.ComponentTypesList);
    }
    get solutionsComponentTypesList() {
        return this.loc(exports.PowerAppsPageSelectors.SolutionsPage.ComponentTypesList);
    }
    get defaultSolutionGrid() {
        return this.loc(exports.PowerAppsPageSelectors.SolutionsPage.DefaultSolutionContainerGrid);
    }
    get solutionPreviewToggle() {
        return this.loc(exports.PowerAppsPageSelectors.SolutionsPage.SolutionPreviewButton);
    }
    getSolutionByName(solutionName) {
        return this.page.getByTestId(solutionName);
    }
    getSitemapById(sitemapId) {
        return this.loc(base_locators_1.LocatorUtils.formatSelector(exports.PowerAppsPageSelectors.SolutionsPage.SiteMapSelector, sitemapId));
    }
    // ============ App Preview Page Locators ============
    get canvasAndPanes() {
        return this.loc(exports.PowerAppsPageSelectors.AppPreviewPage.CanvasAndPanes);
    }
    get canvasPlaceholderNewPage() {
        return this.loc(exports.PowerAppsPageSelectors.AppPreviewPage.CanvasPlaceholderNewPage);
    }
    get previewPlaceholder() {
        return this.loc(exports.PowerAppsPageSelectors.AppPreviewPage.PreviewPlaceholder);
    }
    get saveButton() {
        return this.loc(exports.PowerAppsPageSelectors.AppPreviewPage.SaveButton);
    }
    get publishButton() {
        return this.loc(exports.PowerAppsPageSelectors.AppPreviewPage.PublishButton);
    }
    get playButton() {
        return this.loc(exports.PowerAppsPageSelectors.AppPreviewPage.PlayButton);
    }
    get closeButton() {
        return this.loc(exports.PowerAppsPageSelectors.AppPreviewPage.CloseButton);
    }
    get canvasAppManagementPage() {
        return this.loc(exports.PowerAppsPageSelectors.AppPreviewPage.CanvasAppManagementPage);
    }
    get backstageRootComponent() {
        return this.loc(exports.PowerAppsPageSelectors.AppPreviewPage.CanvasAppBackStageRootComponent);
    }
    // ============ Model App Page Locators ============
    get applicationShell() {
        return this.loc(exports.PowerAppsPageSelectors.ModelAppPage.ApplicationShell);
    }
    get appTitle() {
        return this.loc(exports.PowerAppsPageSelectors.ModelAppPage.AppTitle);
    }
    get globalCommandBar() {
        return this.loc(exports.PowerAppsPageSelectors.ModelAppPage.GlobalCommandBar);
    }
    get mainContent() {
        return this.loc(exports.PowerAppsPageSelectors.ModelAppPage.MainContent);
    }
    // ============ Teaching Bubble Locators ============
    get teachingBubble() {
        return this.loc(exports.PowerAppsPageSelectors.TeachingBubble);
    }
    get teachingBubbleCloseButton() {
        return this.loc(exports.PowerAppsPageSelectors.TeachingBubbleCloseButton);
    }
    get teachingBubblePrimaryButton() {
        return this.loc(exports.PowerAppsPageSelectors.TeachingBubblePrimaryButton);
    }
    // ============ Dialog Locators ============
    get modalFocusTrapZone() {
        return this.loc(exports.PowerAppsPageSelectors.ModalFocusTrapZone);
    }
    get dialogAcceptButton() {
        return this.loc(exports.PowerAppsPageSelectors.DialogAcceptButton);
    }
    get dialogCancelButton() {
        return this.loc(exports.PowerAppsPageSelectors.DialogCancelButton);
    }
    // ============ Canvas Designer Locators ============
    get canvasDesignerIframe() {
        return this.loc(exports.PowerAppsPageSelectors.CanvasDesignerIframe);
    }
    get canvasPlayerIframe() {
        return this.loc(exports.PowerAppsPageSelectors.CanvasPlayerIframe);
    }
    // ============ Authentication Locators ============
    get meInitialsButton() {
        return this.loc(exports.PowerAppsPageSelectors.MeInitialsButton);
    }
    get signOutButton() {
        return this.loc(exports.PowerAppsPageSelectors.SignOutButton);
    }
    get signOutLink() {
        return this.loc(exports.PowerAppsPageSelectors.SignOutLink);
    }
    // ============ Search and Filter ============
    get searchTextBox() {
        return this.solutionsSearchBox;
    }
}
exports.PowerAppsPageLocators = PowerAppsPageLocators;
