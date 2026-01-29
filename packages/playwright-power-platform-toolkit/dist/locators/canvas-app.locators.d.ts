/**
 * Canvas App Locators
 * Centralized selectors for Canvas App creation, editing, and testing
 * Based on Microsoft Power Apps Canvas App documentation
 */
export declare const CanvasAppLocators: {
    Home: {
        CreateButton: string;
        CreateMenu: string;
        BlankAppOption: string;
        TemplateAppOption: string;
        DataAppOption: string;
        AppsGrid: string;
        AppCard: (appName: string) => string;
        SearchBox: string;
        FilterButton: string;
    };
    Studio: {
        StudioFrame: string;
        CommandBar: {
            AppName: string;
            SaveButton: string;
            SaveAsButton: string;
            PublishButton: string;
            PlayButton: string;
            SettingsButton: string;
            UndoButton: string;
            RedoButton: string;
            ShareButton: string;
        };
        LeftNav: {
            TreeViewTab: string;
            InsertTab: string;
            DataTab: string;
            MediaTab: string;
            AdvancedTab: string;
            SearchButton: string;
        };
        Insert: {
            SearchControl: string;
            LayoutSection: string;
            InputSection: string;
            DisplaySection: string;
            IconsSection: string;
            MediaSection: string;
            ChartsSection: string;
            AISection: string;
            ButtonControl: string;
            TextLabelControl: string;
            TextInputControl: string;
            DropdownControl: string;
            ComboboxControl: string;
            DatePickerControl: string;
            GalleryControl: string;
            FormControl: string;
            DataTableControl: string;
            IconControl: string;
            ImageControl: string;
            ShapeControl: string;
            ChartControl: string;
        };
        Data: {
            AddDataButton: string;
            SearchDataSource: string;
            DataSourcesList: string;
            DataSourceItem: (sourceName: string) => string;
            ConnectButton: string;
            RefreshButton: string;
        };
        Canvas: {
            CanvasArea: string;
            Screen: (screenName: string) => string;
            Control: (controlName: string) => string;
            SelectedControl: string;
        };
        Properties: {
            PropertiesPanel: string;
            PropertySearch: string;
            PropertyItem: (propertyName: string) => string;
            Text: string;
            Color: string;
            Fill: string;
            X: string;
            Y: string;
            Width: string;
            Height: string;
            Visible: string;
            OnSelect: string;
        };
        FormulaBar: {
            FormulaInput: string;
            PropertyDropdown: string;
            ErrorIndicator: string;
            IntelliSenseList: string;
        };
        Screens: {
            ScreensList: string;
            AddScreenButton: string;
            ScreenItem: (screenName: string) => string;
            ScreenMenu: string;
            DuplicateScreen: string;
            DeleteScreen: string;
        };
    };
    Settings: {
        SettingsDialog: string;
        GeneralTab: string;
        DisplayTab: string;
        UpdatesTab: string;
        SupportTab: string;
        AppNameInput: string;
        AppDescriptionInput: string;
        AppIconUpload: string;
        OrientationDropdown: string;
        ScreenSizeDropdown: string;
        ScaleFitRadio: string;
        LockAspectRatio: string;
        CloseButton: string;
        SaveButton: string;
    };
    SaveDialog: {
        Dialog: string;
        AppNameInput: string;
        SaveButton: string;
        CancelButton: string;
        SaveProgressIndicator: string;
        SuccessMessage: string;
    };
    PublishDialog: {
        Dialog: string;
        PublishButton: string;
        CancelButton: string;
        VersionComments: string;
        PublishProgressIndicator: string;
        SuccessMessage: string;
    };
    ShareDialog: {
        Dialog: string;
        SearchUsers: string;
        UsersList: string;
        PermissionDropdown: string;
        CanEditOption: string;
        CanViewOption: string;
        ShareButton: string;
        CopyLinkButton: string;
        CloseButton: string;
    };
    PlayMode: {
        PlayWindow: string;
        StopButton: string;
        RestartButton: string;
        ErrorMessage: string;
    };
    Details: {
        AppDetailsPage: string;
        EditButton: string;
        PlayButton: string;
        ShareButton: string;
        DetailsTab: string;
        VersionsTab: string;
        AnalyticsTab: string;
        AppName: string;
        AppOwner: string;
        AppCreated: string;
        AppModified: string;
        VersionsList: string;
        VersionItem: (version: string) => string;
        RestoreButton: string;
        MoreButton: string;
        DeleteButton: string;
        ExportButton: string;
        AddToSolutionButton: string;
    };
    DeleteDialog: {
        Dialog: string;
        ConfirmMessage: string;
        DeleteButton: string;
        CancelButton: string;
    };
    Common: {
        LoadingSpinner: string;
        ErrorBanner: string;
        SuccessBanner: string;
        ToastNotification: string;
        ConfirmDialog: string;
        CancelButton: string;
        OKButton: string;
        CloseButton: string;
    };
};
/**
 * Helper function to get data test id selector
 */
export declare const getCanvasDataTestId: (testId: string) => string;
/**
 * Helper function to get control by name
 */
export declare const getCanvasControlByName: (controlName: string) => string;
/**
 * Helper function to get screen by name
 */
export declare const getCanvasScreenByName: (screenName: string) => string;
