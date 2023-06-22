import { useTranslation } from 'react-i18next';

function Changer({ inp }) {
var { t } = useTranslation();
    return (
        t(inp)
    )
}

export { Changer };