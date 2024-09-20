const groupsData = [
    {
        id: 1,
        name: "Group A",
        description: "This is a small description for Group A.",
        paymentDate: "Sep 21, 2022",
        amountPerMonth: "$100",
        dateOfJoining: "Jan 15, 2022",
        numberOfMembers: 12,
        durationOfPayment: 6, // in months
        dateOfStart: "Jan 15, 2022",
        dateOfEnd: "Jul 15, 2022",
    },
    {
        id: 2,
        name: "Group B",
        description: "Brief description for Group B.",
        paymentDate: "Oct 10, 2022",
        amountPerMonth: "$120",
        dateOfJoining: "Feb 01, 2022",
        numberOfMembers: 8,
        durationOfPayment: 12,
        dateOfStart: "Feb 01, 2022",
        dateOfEnd: "Jan 31, 2023",
    },
    {
        id: 3,
        name: "Group C",
        description: "Group C has a unique description.",
        paymentDate: "Nov 05, 2022",
        amountPerMonth: "$150",
        dateOfJoining: "Mar 20, 2022",
        numberOfMembers: 15,
        durationOfPayment: 3,
        dateOfStart: "Mar 20, 2022",
        dateOfEnd: "Jun 20, 2022",
    },
    {
        id: 4,
        name: "Group D",
        description: "Description for Group D goes here.",
        paymentDate: "Dec 01, 2022",
        amountPerMonth: "$200",
        dateOfJoining: "Apr 10, 2022",
        numberOfMembers: 20,
        durationOfPayment: 9,
        dateOfStart: "Apr 10, 2022",
        dateOfEnd: "Jan 10, 2023",
    },
    {
        id: 5,
        name: "Group E",
        description: "Small description for Group E.",
        paymentDate: "Jan 15, 2023",
        amountPerMonth: "$180",
        dateOfJoining: "May 25, 2022",
        numberOfMembers: 10,
        durationOfPayment: 6,
        dateOfStart: "May 25, 2022",
        dateOfEnd: "Nov 25, 2022",
    },
    {
        id: 6,
        name: "Group F",
        description: "Brief info about Group F.",
        paymentDate: "Feb 20, 2023",
        amountPerMonth: "$130",
        dateOfJoining: "Jun 15, 2022",
        numberOfMembers: 9,
        durationOfPayment: 4,
        dateOfStart: "Jun 15, 2022",
        dateOfEnd: "Oct 15, 2022",
    },
    {
        id: 7,
        name: "Group G",
        description: "Group G has a detailed description.",
        paymentDate: "Mar 12, 2023",
        amountPerMonth: "$160",
        dateOfJoining: "Jul 01, 2022",
        numberOfMembers: 14,
        durationOfPayment: 5,
        dateOfStart: "Jul 01, 2022",
        dateOfEnd: "Dec 01, 2022",
    },
    {
        id: 8,
        name: "Group H",
        description: "Description of Group H is here.",
        paymentDate: "Apr 08, 2023",
        amountPerMonth: "$140",
        dateOfJoining: "Aug 10, 2022",
        numberOfMembers: 11,
        durationOfPayment: 7,
        dateOfStart: "Aug 10, 2022",
        dateOfEnd: "Mar 10, 2023",
    },
    {
        id: 9,
        name: "Group I",
        description: "Short description for Group I.",
        paymentDate: "May 25, 2023",
        amountPerMonth: "$110",
        dateOfJoining: "Sep 05, 2022",
        numberOfMembers: 13,
        durationOfPayment: 8,
        dateOfStart: "Sep 05, 2022",
        dateOfEnd: "May 05, 2023",
    },
    {
        id: 10,
        name: "Group J",
        description: "Group J description here.",
        paymentDate: "Jun 15, 2023",
        amountPerMonth: "$190",
        dateOfJoining: "Oct 20, 2022",
        numberOfMembers: 7,
        durationOfPayment: 10,
        dateOfStart: "Oct 20, 2022",
        dateOfEnd: "Aug 20, 2023",
    },
    {
        id: 11,
        name: "Group K",
        description: "Group K's description.",
        paymentDate: "Jul 30, 2023",
        amountPerMonth: "$175",
        dateOfJoining: "Nov 01, 2022",
        numberOfMembers: 16,
        durationOfPayment: 6,
        dateOfStart: "Nov 01, 2022",
        dateOfEnd: "Apr 01, 2023",
    },
    {
        id: 12,
        name: "Group L",
        description: "Description for Group L.",
        paymentDate: "Aug 22, 2023",
        amountPerMonth: "$125",
        dateOfJoining: "Dec 15, 2022",
        numberOfMembers: 18,
        durationOfPayment: 12,
        dateOfStart: "Dec 15, 2022",
        dateOfEnd: "Dec 15, 2023",
    },
    {
        id: 13,
        name: "Group M",
        description: "Group M detailed description.",
        paymentDate: "Sep 18, 2023",
        amountPerMonth: "$140",
        dateOfJoining: "Jan 10, 2023",
        numberOfMembers: 11,
        durationOfPayment: 4,
        dateOfStart: "Jan 10, 2023",
        dateOfEnd: "May 10, 2023",
    },
    {
        id: 14,
        name: "Group N",
        description: "Brief description of Group N.",
        paymentDate: "Oct 25, 2023",
        amountPerMonth: "$155",
        dateOfJoining: "Feb 22, 2023",
        numberOfMembers: 10,
        durationOfPayment: 6,
        dateOfStart: "Feb 22, 2023",
        dateOfEnd: "Aug 22, 2023",
    },
    {
        id: 15,
        name: "Group O",
        description: "Group O's brief description.",
        paymentDate: "Nov 10, 2023",
        amountPerMonth: "$135",
        dateOfJoining: "Mar 15, 2023",
        numberOfMembers: 13,
        durationOfPayment: 8,
        dateOfStart: "Mar 15, 2023",
        dateOfEnd: "Nov 15, 2023",
    },
    {
        id: 16,
        name: "Group P",
        description: "Details about Group P.",
        paymentDate: "Dec 20, 2023",
        amountPerMonth: "$165",
        dateOfJoining: "Apr 05, 2023",
        numberOfMembers: 14,
        durationOfPayment: 5,
        dateOfStart: "Apr 05, 2023",
        dateOfEnd: "Sep 05, 2023",
    },
    {
        id: 17,
        name: "Group Q",
        description: "Group Q description here.",
        paymentDate: "Jan 12, 2024",
        amountPerMonth: "$145",
        dateOfJoining: "May 10, 2023",
        numberOfMembers: 9,
        durationOfPayment: 7,
        dateOfStart: "May 10, 2023",
        dateOfEnd: "Dec 10, 2023",
    },
    {
        id: 18,
        name: "Group R",
        description: "Brief description for Group R.",
        paymentDate: "Feb 18, 2024",
        amountPerMonth: "$125",
        dateOfJoining: "Jun 25, 2023",
        numberOfMembers: 15,
        durationOfPayment: 9,
        dateOfStart: "Jun 25, 2023",
        dateOfEnd: "Mar 25, 2024",
    },
    {
        id: 19,
        name: "Group S",
        description: "Short description for Group S.",
        paymentDate: "Mar 15, 2024",
        amountPerMonth: "$190",
        dateOfJoining: "Jul 01, 2023",
        numberOfMembers: 12,
        durationOfPayment: 6,
        dateOfStart: "Jul 01, 2023",
        dateOfEnd: "Jan 01, 2024",
    },
    {
        id: 20,
        name: "Group T",
        description: "Group T has a detailed description.",
        paymentDate: "Apr 22, 2024",
        amountPerMonth: "$155",
        dateOfJoining: "Aug 10, 2023",
        numberOfMembers: 8,
        durationOfPayment: 11,
        dateOfStart: "Aug 10, 2023",
        dateOfEnd: "Jul 10, 2024",
    },
];

export default groupsData;
