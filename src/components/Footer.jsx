import React from 'react';

const Footer = () => {
    const [dateTime, setDateTime] = React.useState('');

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };

    React.useEffect(() => {
        function updateDateTime() {
            const date = new Date();
            setDateTime(date.toLocaleString("en-US", options));
        }

        const intervalId = setInterval(updateDateTime, 1000);
        updateDateTime();

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='h-[100px] flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 text-xs md:text-sm'>
            <div>
                copyright&copy;
            </div>
            <div>
                <a target='_blank' href='https://github.com/mmmim24/'>Mustaq Mujahid Mim</a>
            </div>
            <div>
                {dateTime}
            </div>
        </div>
    );
}

export default Footer;