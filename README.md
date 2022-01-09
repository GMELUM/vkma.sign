# vkma.sign
Данный пакет был создан для обеспечения максимальной производительности при проверке подписи параметров в vkma.

## Установка
**NPM** 
>     npm i -s vkma.sign
**YARN**
>     yarn add vkma.sign
### Импортирование

    import {
	    callbackSign, 
	    syncSign, 
	    asyncSign, 
	    multiSign, 
	    sign, 
	    filter, 
	    hash  
	} from "vkma.sign";

## Ответ

От функций **callbackSign**, **syncSign**, **asyncSign**, **multiSign** приходит ответ одного типа.
Если проверка прошла не успешно то мы получаем **undefined**, а в случае успешной проверки мы получаем объект **URLSearchParams**.

    const auth = syncSign(key, token);
	if(auth) {
		const id = auth.get("vk_user_id");
	}
## callback

    callbackSign(key, token, (auth) => {
	    if(auth) {
		    // успешно
	    }
    })

## sync

	const auth = syncSign(key, token);
	if(auth) {
		// успешно
	}
    
## async

    const auth = await asyncSign(key, token);
	if(auth) {
		// успешно
	}
или

    asyncSign(key, token)
	    .then((auth) => {
		    if(auth) {
			    // успешно
		    }
		})
## multi
Позволяет выполнить проверку сразу по нескольким ключам из массива первого аргумента.

    multiSign([key, key, key], token)
	    .then((auth) => {
		    if(auth) {
			    // успешно
		    }
		})

### Внутренние функции
Так же можно получить доступ к функциям C++и выполнить функции по отдельности:

#### filter
Функция позволяет получить строку с параметрами запуска уже отсортированную для проверки.

    const parseParam = filter(token);

#### hash
Функция позволяет получить строку с итоговым хешем который мы сравниваем с sign.

    const sign = hash(key, parseParam);
