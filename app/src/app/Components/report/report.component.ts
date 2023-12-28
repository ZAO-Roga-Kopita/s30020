import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import { jsPDF } from 'jspdf';
// @ts-ignore
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  sessions: any[] = [
    {
      sessionName: "001",
      sessionTime: "5h",
      sessionDate: new Date(2023, 10, 8, 0, 0, 0, 0),
      sessionStartCharge: 30,
      sessionEndCharge: 100,
      sessionCurrent: [10, 100, 300, 20, 150]
    },
    {
      sessionName: "002",
      sessionTime: "5h",
      sessionDate: new Date(2023, 10, 9, 0, 0, 0, 0),
      sessionStartCharge: 30,
      sessionEndCharge: 100,
      sessionCurrent: [10, 100, 300, 20, 150]
    },
    {
      sessionName: "003",
      sessionTime: "5h",
      sessionDate: new Date(2023, 10, 10, 0, 0, 0, 0),
      sessionStartCharge: 30,
      sessionEndCharge: 100,
      sessionCurrent: [10, 100, 300, 20, 150]
    },
    {
      sessionName: "008",
      sessionTime: "5h",
      sessionDate: new Date(2023, 11, 20, 0, 0, 0, 0),
      sessionStartCharge: 30,
      sessionEndCharge: 100,
      sessionCurrent: [10, 100, 300, 20, 150]
    },
    {
      sessionName: "012",
      sessionTime: "5h",
      sessionDate: new Date(2023, 11, 25, 0, 0, 0, 0),
      sessionStartCharge: 30,
      sessionEndCharge: 100,
      sessionCurrent: [10, 100, 300, 20, 150]
    },
    {
      sessionName: "031",
      sessionTime: "5h",
      sessionDate: new Date(2023, 11, 28, 0, 0, 0, 0),
      sessionStartCharge: 30,
      sessionEndCharge: 100,
      sessionCurrent: [10, 100, 300, 20, 150]
    },
  ]

  errors: any[] = [
    {
      errorCode: "111",
      critical: 1,
      stationStatus: 'CHARGE',
      detectionTime: '15:00',
      errorDate: new Date(2023, 11, 25, 0, 0, 0, 0),
    },
    {
      errorCode: "058",
      critical: 3,
      stationStatus: 'DISCHARGE',
      detectionTime: '15:00',
      errorDate: new Date(2023, 11, 26, 0, 0, 0, 0),
    },
    {
      errorCode: "001",
      critical: 2,
      stationStatus: 'WAIT',
      detectionTime: '15:00',
      errorDate: new Date(2023, 11, 27, 0, 0, 0, 0),
    },
    {
      errorCode: "989",
      critical: 2,
      stationStatus: 'CHARGE',
      detectionTime: '08:00',
      errorDate: new Date(2023, 11, 28, 0, 0, 0, 0),
    }
  ]

  dateRangeForm = new FormGroup({
    startDate: new FormControl(),
    endDate:   new FormControl()
  });

  errorDateRangeForm = new FormGroup({
    errorStartDate: new FormControl(),
    errorEndDate:   new FormControl()
  });


  generatePDF(sessions: any[]) {
    let doc = new jsPDF();

    doc.addFont("assets/PTSans-Regular.ttf", "PTSans", "normal");
    doc.setFont("PTSans");

    let sessionsTableData = sessions.map((item) => [
      item.sessionName, item.sessionTime,
      new Date(item.sessionDate).getFullYear()+'-'+(new Date(item.sessionDate).getMonth()+1)+'-'+new Date(item.sessionDate).getDate(),
      item.sessionStartCharge, item.sessionEndCharge
    ]);

    autoTable(doc, {
      head: [['Название сессии', 'Время сессии', 'Дата сессии', 'Начальная зарядка', 'Конечная зарядка']],
      body: sessionsTableData,
      styles: {font: "PTSans"},
      margin: {top: 10}
    });


    if(sessions.length == 1) {
      doc.save(`отчет_${new Date(sessions[0].sessionDate).getDate() +'-' + (new Date(sessions[0].sessionDate).getMonth()+1)+'-'+new Date(sessions[0].sessionDate).getFullYear()}.pdf`);
    } else {
      let lastIndex= sessions.length - 1;

      let sessionsStartDate =
        new Date(sessions[0].sessionDate).getDate() +'-'+ (new Date(sessions[0].sessionDate).getMonth()+1)+'-'+new Date(sessions[0].sessionDate).getFullYear();
      let sessionsEndDate =
        new Date(sessions[lastIndex].sessionDate).getDate() +'-'+ (new Date(sessions[lastIndex].sessionDate).getMonth()+1)+'-'+new Date(sessions[lastIndex].sessionDate).getFullYear();

      doc.save(`отчет_${sessionsStartDate} -- ${sessionsEndDate}.pdf`)
    }
  }

  generateErrorsPDFReport() {
    let selectedErrors = this.errors.filter((item) => {
      return item.errorDate >= new Date(this.errorDateRangeForm.value.errorStartDate) && item.errorDate <= new Date(this.errorDateRangeForm.value.errorEndDate) ? item : null;
    })

    let doc= new jsPDF();

    doc.addFont("assets/PTSans-Regular.ttf", "PTSans", "normal");
    doc.setFont("PTSans");

    let errorsByCategory = selectedErrors.reduce((acc, item) => {
      if      (item.critical == 1) acc.normalErrors.push(item);
      else if (item.critical == 2) acc.warningErrors.push(item);
      else if (item.critical == 3) acc.criticalErrors.push(item);
      return acc;
    }, {normalErrors: [], warningErrors: [], criticalErrors: []});


    let tableData: any = {
      'normalErrorsColor':   [102, 193, 0],
      'warningErrorsColor':  [234, 142, 0],
      'criticalErrorsColor': [255, 54,  0],
    };

    for (let category in errorsByCategory) {
      tableData[category] = errorsByCategory[category].map((item: any) => [item.errorCode, item.stationStatus, item.detectionTime, item.critical]);
    }

    if(tableData.normalErrors.length == 0 && tableData.warningErrors.length == 0 && tableData.criticalErrors == 0) {
      alert('На выбранный период дат отчеты не найдены!')
    } else {
      this.setErrorsTableData(doc, tableData.normalErrors, tableData.normalErrorsColor)
      this.setErrorsTableData(doc, tableData.warningErrors, tableData.warningErrorsColor)
      this.setErrorsTableData(doc, tableData.criticalErrors, tableData.criticalErrorsColor)

      doc.save(`отчет_по_ошибкам.pdf`);
    }
  }

  setErrorsTableData(document: jsPDF, bodyData: any[][], color: [number, number, number]) {
    autoTable(document, {
      head: [['Код ошибки', 'Статус станции', 'Время обнаружения', 'Критичность']],
      body: bodyData,
      headStyles: {fillColor : color, textColor: [255, 255, 255]},
      styles: {font: "PTSans"},
      margin: {top: 10}
    })
  }

  getSession(sessionName: string) {
    this.generatePDF([this.sessions.find((item) => item.sessionName == sessionName)]);
  }

  submit() {
    let selectedSessions = this.sessions.filter((item) => {
      return item.sessionDate >= new Date(this.dateRangeForm.value.startDate) &&
             item.sessionDate <= new Date(this.dateRangeForm.value.endDate) ?
             item : null;
    })

    selectedSessions.length == 0 ? alert('На выбранный период дат отчеты не найдены!') : this.generatePDF(selectedSessions);
  }
}
