/**
 * Model Driven App Locators
 * Centralized selectors for Model Driven App creation, editing, and testing
 * Based on Microsoft Power Apps Model Driven App documentation
 */
export declare const ModelDrivenAppLocators: {
    Home: {
        CreateButton: string;
        CreateMenu: string;
        BlankAppOption: string;
        FromSolutionOption: string;
        AppsGrid: string;
        AppCard: (appName: string) => string;
        AppTypeFilter: string;
        ModelDrivenOption: string;
        SearchBox: string;
    };
    Designer: {
        CommandBar: {
            AppNameInput: string;
            SaveButton: string;
            PublishButton: string;
            PlayButton: string;
            SettingsButton: string;
            ShareButton: string;
            ValidateButton: string;
            SwitchToClassicButton: string;
        };
        LeftNav: {
            NavigationTab: string;
            PagesTab: string;
            DataTab: string;
            AutomationTab: string;
        };
        Pages: {
            PagesList: string;
            AddPageButton: string;
            NewPageMenu: string;
            TableBasedPage: string;
            DashboardPage: string;
            CustomPage: string;
            PageItem: (pageName: string) => string;
            PageMenu: string;
            EditPage: string;
            DeletePage: string;
            MovePage: string;
        };
        Navigation: {
            NavigationTree: string;
            AddGroupButton: string;
            AddSubAreaButton: string;
            GroupItem: (groupName: string) => string;
            SubAreaItem: (subAreaName: string) => string;
            TitleInput: string;
            IconPicker: string;
            TablePicker: string;
            UrlInput: string;
        };
        Data: {
            AddTableButton: string;
            SearchTable: string;
            TablesList: string;
            TableItem: (tableName: string) => string;
            FormsSection: string;
            ViewsSection: string;
            ChartsSection: string;
            DashboardsSection: string;
        };
        Properties: {
            PropertiesPanel: string;
            DisplayNameInput: string;
            DescriptionInput: string;
            IconPicker: string;
            WelcomePageToggle: string;
            MobileToggle: string;
        };
        Canvas: {
            PreviewArea: string;
            AppModule: string;
            SiteMap: string;
        };
    };
    CreateTableDialog: {
        Dialog: string;
        DisplayNameInput: string;
        PluralNameInput: string;
        DescriptionInput: string;
        EnableAttachmentsToggle: string;
        CreateButton: string;
        CancelButton: string;
    };
    AddPageDialog: {
        Dialog: string;
        PageTypeList: string;
        SelectTableDropdown: string;
        TableOption: (tableName: string) => string;
        FormsList: string;
        FormItem: (formName: string) => string;
        MainForm: string;
        QuickCreateForm: string;
        QuickViewForm: string;
        ViewsList: string;
        ViewItem: (viewName: string) => string;
        AddButton: string;
        CancelButton: string;
    };
    Settings: {
        Dialog: string;
        GeneralTab: string;
        FeaturesTab: string;
        UpcomingTab: string;
        AppNameInput: string;
        DescriptionInput: string;
        AppIconUpload: string;
        WelcomePageUrl: string;
        EnableMobileToggle: string;
        EnableOfflineToggle: string;
        ReadOnlyToggle: string;
        SaveButton: string;
        CloseButton: string;
    };
    PublishDialog: {
        Dialog: string;
        PublishButton: string;
        CancelButton: string;
        ProgressIndicator: string;
        SuccessMessage: string;
    };
    Validation: {
        ValidationPanel: string;
        ErrorsList: string;
        WarningsList: string;
        ErrorItem: string;
        WarningItem: string;
        FixButton: string;
        IgnoreButton: string;
        CloseButton: string;
    };
    Runtime: {
        AppBar: {
            AppName: string;
            SearchBox: string;
            SettingsButton: string;
            HelpButton: string;
            UserMenu: string;
        };
        SiteMap: {
            NavigationPane: string;
            ExpandButton: string;
            CollapseButton: string;
            GroupHeader: (groupName: string) => string;
            SubArea: (subAreaName: string) => string;
            RecentItems: string;
            PinnedItems: string;
        };
        Content: {
            MainContent: string;
            PageTitle: string;
            CommandBar: string;
            Grid: string;
            GridRow: string;
            GridCell: string;
            Form: string;
            FormHeader: string;
            FormTabs: string;
            FormTab: (tabName: string) => string;
            FormSection: (sectionName: string) => string;
            FormField: (fieldName: string) => string;
            Dashboard: string;
            DashboardChart: string;
            DashboardGrid: string;
        };
        Commands: {
            NewButton: string;
            SaveButton: string;
            SaveAndCloseButton: string;
            DeleteButton: string;
            RefreshButton: string;
            ExportButton: string;
            EmailButton: string;
            FlowButton: string;
            MoreCommandsButton: string;
        };
    };
    ShareDialog: {
        Dialog: string;
        SearchUsers: string;
        UsersList: string;
        SecurityRoleDropdown: string;
        ReadPrivilege: string;
        WritePrivilege: string;
        ShareButton: string;
        ManageRolesButton: string;
        CloseButton: string;
    };
    Details: {
        DetailsPage: string;
        EditButton: string;
        PlayButton: string;
        ShareButton: string;
        OverviewTab: string;
        ComponentsTab: string;
        SettingsTab: string;
        AppName: string;
        AppDescription: string;
        AppOwner: string;
        AppCreated: string;
        AppModified: string;
        ComponentsList: string;
        TablesCount: string;
        FormsCount: string;
        ViewsCount: string;
        ChartsCount: string;
        MoreButton: string;
        DeleteButton: string;
        ExportButton: string;
        ImportButton: string;
        CopyButton: string;
        AddToSolutionButton: string;
    };
    Solutions: {
        SolutionExplorer: string;
        AddExistingButton: string;
        AddNewButton: string;
        SolutionPicker: string;
        SolutionOption: (solutionName: string) => string;
        AddButton: string;
    };
    DeleteDialog: {
        Dialog: string;
        ConfirmMessage: string;
        ConfirmCheckbox: string;
        DeleteButton: string;
        CancelButton: string;
    };
    Common: {
        LoadingSpinner: string;
        ErrorNotification: string;
        SuccessNotification: string;
        ToastMessage: string;
        ConfirmDialog: string;
        BackButton: string;
        CloseButton: string;
        SaveButton: string;
        CancelButton: string;
        OKButton: string;
    };
};
/**
 * Helper function to get data automation id selector
 */
export declare const getModelDrivenDataAutomationId: (automationId: string) => string;
/**
 * Helper function to get table page selector
 */
export declare const getModelDrivenTablePage: (tableName: string) => string;
/**
 * Helper function to get form field selector
 */
export declare const getModelDrivenFormField: (fieldName: string) => string;
/**
 * Helper function to get navigation item selector
 */
export declare const getModelDrivenNavItem: (itemName: string) => string;
