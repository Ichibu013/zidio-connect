export default function SearchHeaderActionBtns({ btn1, btn2, btn3, btn4, isLoggedIn }) {
    const primaryButton = isLoggedIn ? btn2 : btn1;
    const secondaryButton = isLoggedIn ? btn4 : btn3;

    return (
        <div className="flex items-center gap-2">
            {primaryButton}
            {secondaryButton}
        </div>
    );
}