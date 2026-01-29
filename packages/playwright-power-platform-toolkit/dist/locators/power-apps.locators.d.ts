/**
 * Power Apps Page Locators using Playwright Best Practices
 * Centralized locator management for Power Apps Maker Portal
 * Supports Canvas Apps, Model-Driven Apps, and Power Platform portal
 * Extracted and enhanced from lib/old
 */
import { Page, Locator } from '@playwright/test';
/**
 * Power Apps Page Selectors - Constant object for easy management
 * Organized by page/section for better maintainability
 */
export declare const PowerAppsPageSelectors: {
    Root: string;
    PageHeader: string;
    MainNavigation: string;
    AppsPage: {
        MainContainer: string;
        PageContainer: string;
        Sidebar: string;
        CommandBar: string;
        NewApp: string;
        AllApps: string;
        CanvasApp: string;
        ModelApp: string;
        PortalApp: string;
        EditApp: string;
        CanvasEditApp: string;
        DeleteApp: string;
        AppListsGridContainer: string;
        AppNameContainerSelector: string;
        AppSelector: string;
        ContextualMenu: string;
    };
    SolutionsPage: {
        SideBar: string;
        CommandBar: string;
        SearchTextBox: string;
        SolutionsListContainer: string;
        ComponentTypesList: string;
        DefaultSolutionContainerGrid: string;
        SolutionPreviewButton: string;
        SolutionSelector: string;
        SolutionNewLookTeachingBubble: string;
        SolutionNewLookTeachingBubbleCloseButton: string;
        SiteMapContainer: string;
        SiteMapNameContainer: string;
        SiteMapSelector: string;
    };
    AppPreviewPage: {
        CanvasAndPanes: string;
        CanvasAppBackStageRootComponent: string;
        CanvasAppManagementPage: string;
        CanvasPlaceholderNewPage: string;
        CloseButton: string;
        PlayButton: string;
        PreviewPlaceholder: string;
        PublishButton: string;
        SaveButton: string;
    };
    ModelAppPage: {
        ApplicationShell: string;
        AppTitle: string;
        GlobalCommandBar: string;
        MainContent: string;
    };
    HomePage: {
        Apps: string;
        MainContainer: string;
        MainContent: string;
        HomePageContainer: string;
        HeaderRegion: string;
        PlansSection: string;
        AppsSection: string;
        LearningSection: string;
    };
    TeachingBubble: string;
    TeachingBubbleCloseButton: string;
    TeachingBubblePrimaryButton: string;
    ModalFocusTrapZone: string;
    DialogAcceptButton: string;
    DialogCancelButton: string;
    CanvasDesignerIframe: string;
    CanvasPlayerIframe: string;
    MeInitialsButton: string;
    SignOutButton: string;
    SignOutLink: string;
    ErrorPage: {
        Container: string;
        Title: string;
        Message: string;
        HomeButton: string;
    };
};
/**
 * Helper class to work with Power Apps selectors and return Playwright Locators
 * Provides strongly-typed access to page elements for Canvas Apps, Model-Driven Apps, etc.
 */
export declare class PowerAppsPageLocators {
    private page;
    constructor(page: Page);
    /**
     * Get locator for a selector string
     */
    private loc;
    get root(): Locator;
    get pageHeader(): Locator;
    get mainNavigation(): Locator;
    get homePageMainContainer(): Locator;
    get homePageMainContent(): Locator;
    get homePageContainer(): Locator;
    get homePageHeaderRegion(): Locator;
    get homePagePlansSection(): Locator;
    get homePageAppsSection(): Locator;
    get homePageLearningSection(): Locator;
    get errorPageContainer(): Locator;
    get errorPageTitle(): Locator;
    get errorPageMessage(): Locator;
    get errorPageHomeButton(): Locator;
    get appsPageMainContainer(): Locator;
    get appsPageContainer(): Locator;
    get sidebar(): Locator;
    get commandBar(): Locator;
    get appsPageCommandBar(): Locator;
    get appListsGridContainer(): Locator;
    get newAppButton(): Locator;
    get allAppsButton(): Locator;
    get canvasAppButton(): Locator;
    get modelAppButton(): Locator;
    get editAppButton(): Locator;
    get deleteAppButton(): Locator;
    get appListGrid(): Locator;
    get contextualMenu(): Locator;
    /**
     * Get app by name using a link locator
     */
    getAppByName(appName: string): Locator;
    /**
     * Get app row container by name
     */
    getAppRowByName(appName: string): Locator;
    get solutionsSidebar(): Locator;
    get solutionsCommandBar(): Locator;
    get solutionsSearchBox(): Locator;
    get solutionsListContainer(): Locator;
    get componentTypesList(): Locator;
    get solutionsComponentTypesList(): Locator;
    get defaultSolutionGrid(): Locator;
    get solutionPreviewToggle(): Locator;
    getSolutionByName(solutionName: string): Locator;
    getSitemapById(sitemapId: string): Locator;
    get canvasAndPanes(): Locator;
    get canvasPlaceholderNewPage(): Locator;
    get previewPlaceholder(): Locator;
    get saveButton(): Locator;
    get publishButton(): Locator;
    get playButton(): Locator;
    get closeButton(): Locator;
    get canvasAppManagementPage(): Locator;
    get backstageRootComponent(): Locator;
    get applicationShell(): Locator;
    get appTitle(): Locator;
    get globalCommandBar(): Locator;
    get mainContent(): Locator;
    get teachingBubble(): Locator;
    get teachingBubbleCloseButton(): Locator;
    get teachingBubblePrimaryButton(): Locator;
    get modalFocusTrapZone(): Locator;
    get dialogAcceptButton(): Locator;
    get dialogCancelButton(): Locator;
    get canvasDesignerIframe(): Locator;
    get canvasPlayerIframe(): Locator;
    get meInitialsButton(): Locator;
    get signOutButton(): Locator;
    get signOutLink(): Locator;
    get searchTextBox(): Locator;
}
