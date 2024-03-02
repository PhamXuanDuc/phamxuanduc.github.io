
export const Pattern = {
	TEXT_PATTERN: `[0-9A-Za-z()---+="'/.,;:\\ ]*`,
	ALPHANUMERIC_PATTERN: `[0-9A-Za-z]*`,
	NUMBER_PATTERN: `\\d+`,
	DECIMAL_NUMBER: `[\\d]{1,20}([\\.|\\,]\\d{1,2})?`,
	PHONE_NUMBER: `^(09|03|07|08|05)+([0-9]{8})$`,
	FAX_NUMBER: `\\+?[0-9]{7,10}`,
	TAX_CODE: `\\d{10}(\\d{2})?`,
	DMY_DATE_PATTERN: `(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d`,
	MDY_DATE_PATTERN: `(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d`,
	// EMAIL_PATTERN: `[a-z][a-z0-9_\\.]{5,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}`,
	EMAIL_PATTERN: `[^\\s@]+@[^\\s@]+\\.[^\\s@]+`,
	// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
	PASSWORD_PATTERN: `(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}`,
};
