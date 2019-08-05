import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  private _firmwareList: string[];
  private _selectedFirmware: string;

  private _portList: string[];
  private _selectedPort: string;

  private _baudRateList: string[];
  private _selectedBaudRate: string;

  constructor(private _machineService: MachineService) { }

  ngOnInit() {
    this.updateData();
  }

  updateData() {
    this._machineService.getSelectedFirmware().subscribe(selectedFirmware => {
      this._selectedFirmware = selectedFirmware;
    });

    this._machineService.getFirmwareList().subscribe(firmwareList => {
      this._firmwareList = firmwareList;
    });

    this._machineService.getSelectedPort().subscribe(selectedPort => {
      this._selectedPort = selectedPort;
    });

    this._machineService.getPortList().subscribe(portList => {
      this._portList = portList;
    });

    this._machineService.getBaudRateList().subscribe(baudRateList => {
      this._baudRateList = baudRateList;
    });

    this._machineService.getSelectedBaudRate().subscribe(baudRate => {
      this._selectedBaudRate = baudRate;
    });
  }

  onSelectFirmware($event) {
    this._machineService
      .setSelectedFirmware(this._selectedFirmware)
      .subscribe();
  }

  onSelectBaudRate($event) {
    this._machineService
      .setSelectedBaudRate(this._selectedBaudRate)
      .subscribe();
  }

  onSelectPort($event) {
    this._machineService
      .setSelectedPort(this._selectedPort)
      .subscribe();
  }

  connect() {
    this._machineService
      .connect()
      .subscribe();
  }

  get selectedPort(): string {
    return this._selectedPort;
  }

  set selectedPort(selectedPort: string) {
    this._selectedPort = selectedPort;
  }

  get portList(): string[] {
    return this._portList;
  }

  get baudRateList(): string[] {
    return this._baudRateList;
  }
}
