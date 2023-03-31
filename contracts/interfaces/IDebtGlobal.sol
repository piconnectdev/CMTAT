//SPDX-License-Identifier: MPL-2.0

pragma solidity ^0.8.17;

interface IDebtGlobal {
    struct DebtBase {
        uint256 interestRate;
        uint256 parValue;
        string guarantor;
        string bondHolder;
        string maturityDate;
        string interestScheduleFormat;
        string interestPaymentDate;
        string dayCountConvention;
        string businessDayConvention;
        string publicHolidayCalendar;
        string issuanceDate;
        string couponFrequency;
    }

    enum CREDIT_EVENT_FLAG{
        NO_FLAG, FLAG_DEFAULT, FLAG_REDEEMED
    }
    struct CreditEvents {
        // flagDefault binary: 01
        // flagRedeemed binary: 10
        uint256 flag;
        string rating;
    }
}
