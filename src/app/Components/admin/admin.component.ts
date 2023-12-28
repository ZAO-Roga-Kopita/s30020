import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  public tablesNames = ['Имя', 'Табельный номер', 'Номер телефона', 'Электронная почта', 'Уровень доступа'];

  public tableData = [
    { name: 'Агафья Морква', tabNumber: '1234', phone: '+7123456789', email: 'sexygirl@mail.ru', permission: 1 },
    { name: 'Ефпилампий Перденко', tabNumber: '4321', phone: '+7123456789', email: 'perdolik@mail.ru', permission: 2 },
    { name: 'Богдан Аналов', tabNumber: '1324', phone: '+7123456789', email: 'boganalov@mail.ru', permission: 3 },
    { name: 'Альбина Сексова', tabNumber: '1243', phone: '+7123456789', email: 'sexpotelefonu@mail.ru', permission: 2 },
    { name: 'Головач Елена', tabNumber: '1432', phone: '+7123456789', email: 'golovachlena@mail.ru', permission: 2 },
  ];

  translatePermission(permission: number): string {
    switch (permission) {
      case 1:
        return 'Администратор';
      case 2:
        return 'Диспетчер';
      case 3:
        return 'Сервис';
      case 4:
        return 'Отключен'
      default:
        "undefined"
    }
    return ""
  }
}
