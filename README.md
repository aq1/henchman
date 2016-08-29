[![Gitter](https://badges.gitter.im/henchman0/Lobby.svg)](https://gitter.im/henchman0/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Маленький проект для маленьких домашних дел.

Для запуска нужен python 3, все модули из requirements.txt. Установи их и делай миграции.

Для фронтенда нужен bower. Запусти bower install в `henchman/treasurer/static`

Быстрая справка по моделям:

* Account.
Счет пользователя. Например, кредитка или обычная карта.
Поле limit показывает сколько на этой карте должны быть денег,
чтобы счет был положительным. В большинстве случаев limit будет равен 0,
но для кредиток, например, это будет какое-то положительное число вроде 150 000.

* Category.
Категория транзакции. Это mptt. Т.е. структура древовидная. У категории может быть родитель.
Например Еда -> обед, Еда -> супермаркет, Бытовые расходы -> комунальные платежи -> газ.
Подразумевается, что в статистике можно легко посмотреть расходы как на узкие категории
(например, сколько ты за год потратил на пиццу), как и на расходы в более широком плане (сколько потратил за год на еду в целом)

* Check.
Чек для транзакции. Фотография или скан. Например, для хранения квитанций по квартплате, чтобы выкидывать бумажки.

* Transaction.
Операция со счетом. Расход \ Доход.
