import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  apiUrl = 'http://165.22.107.91:1234/v1';
  title = 'export-test';

  constructor(private http: HttpClient) {
  }

  onDownload(projectId: string) {
    this.http.get(`${this.apiUrl}/project/export_project/${projectId}`, {
      responseType: 'arraybuffer',
      headers: new HttpHeaders({
        'Content-Type': 'application/octet-stream'
      })
    }).subscribe(res => {
      const blob = new Blob([res], {
        type: 'application/zip'
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  ngOnInit(): void {
  }
}
