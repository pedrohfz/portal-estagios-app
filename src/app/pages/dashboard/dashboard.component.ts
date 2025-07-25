import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

import { DashboardData, UsuarioService, VagasPorArea } from '../../services/usuario.service'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss' 
})
export class DashboardComponent implements OnInit, AfterViewInit {

  dashboardData: DashboardData | null = null;
  errorMessage: string | null = null;
  chart: Chart | undefined;

  @ViewChild('vagasChartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private usuarioService: UsuarioService) { } 

  ngOnInit(): void {
    this.getDashboardData();
  }

  ngAfterViewInit(): void {
    
    if (this.dashboardData && this.chartCanvas) {
      this.createChart(this.dashboardData.vagasPorArea);
    }
  }

  getDashboardData(): void {
    this.usuarioService.getDashboardData().subscribe({
      next: (data: DashboardData) => {
        this.dashboardData = data;
        
        setTimeout(() => {
          if (this.chartCanvas) {
            this.createChart(this.dashboardData!.vagasPorArea);
          } 
        }, 0);
      }
    });
  }

  createChart(vagasPorArea: VagasPorArea[]): void {
    console.log("criar chart");

    if (!vagasPorArea || vagasPorArea.length === 0) {
      console.warn('Nenhum dado de vagas por área para criar o gráfico.');
      return;
    }

    if (!this.chartCanvas || !this.chartCanvas.nativeElement) {
      console.error('A referência do elemento Canvas é nula ou seu nativeElement é indefinido.');
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');

    if (!ctx) {
      console.error('Falha ao obter o contexto 2D para a tela. Não é possível criar o gráfico..');
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar', 
      data: {
        labels: vagasPorArea.map(item => item.areaNome),
        datasets: [{
          label: 'Quantidade de Vagas',
          data: vagasPorArea.map(item => item.quantidade),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Quantidade'
            }
          },
          x: {
            title: {
                display: true,
                text: 'Área de Interesse'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Quantidade de Vagas por Área'
          },
          legend: {
            display: false
          }
        }
      }
    });
  }
}