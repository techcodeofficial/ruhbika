export const formatPhoneNumber = phoneNumber => {
    phoneNumber = String(phoneNumber);
    const cleanedNumber = phoneNumber.replace(/\D/g, "");
    if (cleanedNumber.length == 10) {
        return "98" + cleanedNumber;
    } else if (cleanedNumber.length == 11 && cleanedNumber.startsWith("0")) {
        return "98" + cleanedNumber.substring(1);
    } else if (cleanedNumber.length == 12 && cleanedNumber.startsWith("98")) {
        return cleanedNumber;
    } else {
        return false;
    }
};
export const extractAccountTitle = account => {
    if (account.abs_object) {
        if (account.abs_object.title) return account.abs_object.title;
        let fullName = "";
        if (account.abs_object.first_name)
            fullName += account.abs_object.first_name + " ";
        if (account.abs_object.last_name)
            fullName += account.abs_object.last_name;
        return fullName;
    } else {
        if (account.title) return account.title;
        let fullName = "";
        if (account.first_name) fullName += account.first_name + " ";
        if (account.last_name) fullName += account.last_name;
        return fullName;
    }
};
