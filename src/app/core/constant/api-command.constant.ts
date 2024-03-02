import { environment } from 'src/environments/environment';


export const BaseURL = {

    API_AUTH: environment.PORTAL_SERVICE + 'auth',
    API_DEPARTMENT: environment.PORTAL_SERVICE + 'department',
    API_GROUP: environment.PORTAL_SERVICE + 'group',
    API_USER: environment.PORTAL_SERVICE + 'user',
    API_ROLE: environment.PORTAL_SERVICE + 'role',
    API_MENU: environment.PORTAL_SERVICE + 'menu',
    API_PER: environment.PORTAL_SERVICE + 'per',
    API_CUSTOMER: environment.PORTAL_SERVICE + 'customer',
    API_LOAN_ACCOUNT: environment.PORTAL_SERVICE + 'loanaccount',
    API_ASSET: environment.STATEMENT_SERVICE + 'asset',
    API_GROUP_ASSET:environment.STATEMENT_SERVICE + 'groupasset',
    API_SUB_GROUP_ASSET:environment.STATEMENT_SERVICE + 'childgroupasset',
    API_INVENTORY:environment.STATEMENT_SERVICE+"inventory",
    API_TRANFER:environment.STATEMENT_SERVICE+"transfer",
    API_INVENTORY_PHASE:environment.STATEMENT_SERVICE+"inventoryPhase",
    API_STATUS_COMMON : environment.PORTAL_SERVICE+ 'statuscommon',
    API_TASK : environment.PORTAL_SERVICE+ 'task',
    API_SYSTEM_PARAMETER : environment.PORTAL_SERVICE+ 'systemparameter',
    API_MAIL : environment.PORTAL_SERVICE+ 'mail',

    API_PRODUCT: environment.PORTAL_SERVICE + 'product',
    API_LOAN_GROUP: environment.PORTAL_SERVICE + 'loan-group',
    API_CAMPAIGN: environment.PORTAL_SERVICE + 'campaign',
    API_CUSTOMER_CONTACT: environment.PORTAL_SERVICE + 'customercontact',

    API_SYSTEM_LOGS: environment.PORTAL_SERVICE + 'system-logs',

};
