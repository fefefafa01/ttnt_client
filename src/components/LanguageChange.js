import { useTranslation } from 'react-i18next';

function Changer({ inp }) {
var { t, i18n } = useTranslation();
    return (
        t(inp)
    )
}

export { Changer };