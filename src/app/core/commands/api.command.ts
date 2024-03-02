import { BaseURL } from '../constant/api-command.constant';


export class CommandURL {

    // Auth
    public static LOGIN = BaseURL.API_AUTH + '/login';
    public static RESET_PASSWORD = BaseURL.API_USER+"/resetPass";

    // Department
    public static FIND_ALL = BaseURL.API_DEPARTMENT + '/getAll';
    public static GET_DEPARTMENT_PAGING = BaseURL.API_DEPARTMENT + '/getDepartmentPaging';
    public static CREATE_DEPARTMENT = BaseURL.API_DEPARTMENT + '/createDepartment';
    public static UPDATE_DEPARTMENT = BaseURL.API_DEPARTMENT + '/updateDepartment';
    public static DELETE_DEPARTMENT = BaseURL.API_DEPARTMENT + '/deleteDepartment';
    public static EXPORT_DEPARTMENT = BaseURL.API_DEPARTMENT + '/exportDepartment';
    public static IMPORT_DEPARTMENT = BaseURL.API_DEPARTMENT + '/importDepartment';
    public static EXPORT_TEMPLATE_DEPARTMENT = BaseURL.API_DEPARTMENT+"/exportTemplate";
    public static FIND_DEPARTMENT_CHART = BaseURL.API_DEPARTMENT+"/findDepartmentChart";
    
    // User
    public static GET_USER_PAGING = BaseURL.API_USER + '/getUserPaging';
    public static CREATE_USER = BaseURL.API_USER + '/createUser';
    public static UPDATE_USER = BaseURL.API_USER + '/updateUser';
    public static DELETE_USER = BaseURL.API_USER + '/deleteUser';
    public static RESET_PASS_USER = BaseURL.API_USER + '/resetPass';
    public static IMPORT_USERS = BaseURL.API_USER + '/importUser';
    public static EXPORT_USER = BaseURL.API_USER+"/exportUser";
    public static CHANGE_PASS_USER = BaseURL.API_USER + '/changePassword';

    //Role
    public static CREATE_ROLE = BaseURL.API_ROLE + '/create';
    public static GETBYCONDITION_ROLE = BaseURL.API_ROLE + '/getByCondition';
    public static UPDATE_ROLE = BaseURL.API_ROLE + '/update';

    //Menu
    public static CREATE_MENU = BaseURL.API_MENU + '/create';
    public static GET_MENU_BY_CONDITION = BaseURL.API_MENU + '/getByCondition';
    public static UPDATE_MENU = BaseURL.API_MENU + '/update';
    public static FIND_ALL_MENU = BaseURL.API_MENU + '/findAllMenu';
    public static FIND_MENU_BY_USERID = BaseURL.API_MENU + '/findMenuByUserId';

    //permission
    public static CREATE_PER = BaseURL.API_PER + '/create';
    public static GETALLCONDITION_PER = BaseURL.API_PER + '/getByCondition';
    public static SAVE_PERMISSION = BaseURL.API_PER + '/savePermission';

    //Asset 
    public static SEARCH_ASSET = BaseURL.API_ASSET+'/searchAsset';
    public static CREATE_ASSET = BaseURL.API_ASSET+'/createAsset';
    public static UPDATE_ASSET = BaseURL.API_ASSET+'/updateAsset';
    public static IMPORT_ASSET = BaseURL.API_ASSET+"/importAsset";
    public static SEARCH_CONDITION = BaseURL.API_ASSET+"/getByCondition";
    public static EXPORT_TEMPLATE = BaseURL.API_ASSET+"/export";
    public static FIND_ASSET_FILE = BaseURL.API_ASSET+"/findAssetFile";
    public static EXPORT_ASSET = BaseURL.API_ASSET+"/exportAsset";

    //Group Asset
    public static SEARCH_GROUP_ASSET = BaseURL.API_GROUP_ASSET+'/searchGroupAsset';
    public static CREATE_GROUP_ASSET = BaseURL.API_GROUP_ASSET+'/createGroupAsset';
    public static UPDATE_GROUP_ASSET = BaseURL.API_GROUP_ASSET+'/updateGroupAsset';
    public static IMPORT_GROUP_ASSET = BaseURL.API_GROUP_ASSET+"/importGroupAsset";

    //Child Group Asset 
    public static SEARCH_CHILD_GROUP_ASSET = BaseURL.API_SUB_GROUP_ASSET+'/searchGroupAssetChild';
    public static CREATE_CHILD_GROUP_ASSET = BaseURL.API_SUB_GROUP_ASSET+'/createGroupAssetChild';
    public static UPDATE_CHILD_GROUP_ASSET = BaseURL.API_SUB_GROUP_ASSET+'/updateGroupAssetChild';
    public static IMPORT_CHILD_GROUP_ASSET = BaseURL.API_SUB_GROUP_ASSET+'/importGroupAssetChild';

    //Inventory

    public static SEARCH_INVENTORY = BaseURL.API_INVENTORY+"/searchInventory";
    public static CREATE_INVENTORY = BaseURL.API_INVENTORY+"/createInventory";
    public static UPDATE_INVENTORY = BaseURL.API_INVENTORY+"/updateInventory";


    //Tranfer

    public static SEARCH_TRANFER = BaseURL.API_TRANFER+"/searchTransfer";
    public static CREATE_TRANFER = BaseURL.API_TRANFER+"/createTransfer";
    public static UPDATE_TRANFER = BaseURL.API_TRANFER+"/updateTransfer";
    public static IMPORT_TRANSFER = BaseURL.API_TRANFER+"/importTransfer";
    public static EXPORT_TEMPLATE_TRANSFER = BaseURL.API_TRANFER+"/export"

    //Inventory management

    public static SEARCH_INVENTORY_PHASE = BaseURL.API_INVENTORY_PHASE+"/searchInventoryPhase";
    public static CREATE_INVENTORY_PHASE = BaseURL.API_INVENTORY_PHASE+"/createInventoryPhase";
    public static UPDATE_INVENTORY_PHASE = BaseURL.API_INVENTORY_PHASE+"/updateInventoryPhase";

    //StatusCommon 
    public static FIND_STATUS_COMMON = BaseURL.API_STATUS_COMMON + '/find';

    //System parameter
    public static SEARCH_SYSTEM_PARAMETER = BaseURL.API_SYSTEM_PARAMETER + '/search';
    public static UPDATE_SYSTEM_PARAMETER = BaseURL.API_SYSTEM_PARAMETER + '/update';

    // Task
    public static GET_TASK_PAGING = BaseURL.API_TASK + '/search';
    public static CREATE_TASK = BaseURL.API_TASK + '/create';
    public static UPDATE_TASK = BaseURL.API_TASK + '/update';
    public static DELETE_TASK = BaseURL.API_TASK + '/delete';
    public static EXPORT_TASK = BaseURL.API_TASK + '/export';
    public static IMPORT_TASK = BaseURL.API_TASK + '/import';
    public static FIND_TASK_ATTACHMENTS = BaseURL.API_TASK + '/findTaskAttachments';
    public static EXPORT_TASK_ATTACHMENTS = BaseURL.API_TASK + '/download';
    public static DELETE_TASK_ATTACHMENTS = BaseURL.API_TASK + '/deleteTaskAttachments';
    public static FIND_COMMENT_BY_TASK_CODE = BaseURL.API_TASK + '/findCommentByTaskCode';
    public static CREATE_TASK_COMMENT = BaseURL.API_TASK + '/createTaskComment';
    public static UPDATE_TASK_COMMENT = BaseURL.API_TASK + '/updateTaskComment';
    public static DELETE_TASK_COMMENT = BaseURL.API_TASK + '/deleteTaskComment';

    //Mail
    public static GET_MAIL_PAGING = BaseURL.API_MAIL + '/search';
    public static SEND_MAIL = BaseURL.API_MAIL + '/sendMail';
    public static UPDATE_MAIL = BaseURL.API_MAIL + '/update';


    // Customer
    public static GET_CUSTOMER_PAGING = BaseURL.API_CUSTOMER + '/getCustomerPaging';
    public static CREATE_CUSTOMER = BaseURL.API_CUSTOMER + '/addCustomer';
    public static UPDATE_CUSTOMER = BaseURL.API_CUSTOMER + '/updateCustomer';
    public static DELETE_CUSTOMER = BaseURL.API_CUSTOMER + '/delete';
    public static EXPORT_CUSTOMER = BaseURL.API_CUSTOMER+"/exportCustomer";
    public static IMPORT_CUSTMOER = BaseURL.API_CUSTOMER + '/importCustomer';



    // Loan Account
    public static GET_ACCOUNT_PAGING = BaseURL.API_LOAN_ACCOUNT + '/getLoanAccountPaging';
    public static CREATE_ACCOUNT = BaseURL.API_LOAN_ACCOUNT + '/createLoanAccount';
    public static UPDATE_ACCOUNT = BaseURL.API_LOAN_ACCOUNT+ '/updateLoanAccount';
    public static DELETE_ACCOUNT = BaseURL.API_LOAN_ACCOUNT + '/deleteLoanAccount';


    // Category management
    /*Product*/
    public static CREATE_PRODUCT = BaseURL.API_PRODUCT + '/create';
    public static GETBYCONDITION_PRODUCT = BaseURL.API_PRODUCT + '/getByCondition';
    public static UPDATE_PRODUCT = BaseURL.API_PRODUCT + '/update';
    public static DELETE_PRODUCT = BaseURL.API_PRODUCT + '/delete';
    /*loan group*/
    public static CREATE_LOAN_GROUP = BaseURL.API_LOAN_GROUP + '/create';
    public static GETBYCONDITION_LOAN_GROUP = BaseURL.API_LOAN_GROUP + '/getByCondition';
    public static UPDATE_LOAN_GROUP = BaseURL.API_LOAN_GROUP + '/update';
    public static DELETE_LOAN_GROUP = BaseURL.API_LOAN_GROUP + '/delete';
    /*Campaign*/
    public static CREATE_CAMPAIGN = BaseURL.API_CAMPAIGN + '/create';
    public static GETBYCONDITION_CAMPAIGN = BaseURL.API_CAMPAIGN + '/getByCondition';
    public static UPDATE_CAMPAIGN = BaseURL.API_CAMPAIGN + '/update';
    public static DELETE_CAMPAIGN = BaseURL.API_CAMPAIGN + '/delete';

    // Customer Contact
    public static FIND_CUSTOMER_CONTACT_BY_CUSTOMER_ID = BaseURL.API_CUSTOMER_CONTACT + '/findCustomerContactByCustomerId';
    public static DELETE_CUSTOMER_CONTACT = BaseURL.API_CUSTOMER_CONTACT + '/deleteCustomerContact';
    public static EXPORT_CUSTOMER_CONTACT = BaseURL.API_CUSTOMER_CONTACT+"/exportCustomerContact";


    /*System*/
    /*System log*/
    public static GETBYCONDITION_SYSTEM_LOGS = BaseURL.API_SYSTEM_LOGS + '/getByCondition';

}


