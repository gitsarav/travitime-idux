import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TourService } from "../tour.service";
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { COUNTRIES } from 'src/app/data/countries';
// import { Country } from 'src/app/model/country';

interface Country {
  id?: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES1: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754,
  },
  {
    name: 'France',
    flag: 'c/c3/Flag_of_France.svg',
    area: 640679,
    population: 64979548,
  },
  {
    name: 'Germany',
    flag: 'b/ba/Flag_of_Germany.svg',
    area: 357114,
    population: 82114224,
  },
  {
    name: 'Portugal',
    flag: '5/5c/Flag_of_Portugal.svg',
    area: 92090,
    population: 10329506,
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199,
  },
  {
    name: 'Vietnam',
    flag: '2/21/Flag_of_Vietnam.svg',
    area: 331212,
    population: 95540800,
  },
  {
    name: 'Brazil',
    flag: '0/05/Flag_of_Brazil.svg',
    area: 8515767,
    population: 209288278,
  },
  {
    name: 'Mexico',
    flag: 'f/fc/Flag_of_Mexico.svg',
    area: 1964375,
    population: 129163276,
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463,
  },
  {
    name: 'India',
    flag: '4/41/Flag_of_India.svg',
    area: 3287263,
    population: 1324171354,
  },
  {
    name: 'Indonesia',
    flag: '9/9f/Flag_of_Indonesia.svg',
    area: 1910931,
    population: 263991379,
  },
  {
    name: 'Tuvalu',
    flag: '3/38/Flag_of_Tuvalu.svg',
    area: 26,
    population: 11097,
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397,
  },
];

@Component({
  selector: 'app-all-tours',
  templateUrl: './all-tours.component.html',
  styleUrls: ['./all-tours.component.css'],
})
export class AllToursComponent implements OnInit {
  page = 1;
  pageSize = 4;
  collectionSize = COUNTRIES.length;
  countries: Country[];
  allTours = [];
  moment = moment;
  natureOfOptions = [
    {
      label:"Flight",
      value:"1"
    },
    {
      label:"Train",
      value:"2"
    },
    {
      label:"Car",
      value:"3"
    },
    {
      label:"Bus",
      value:"4"
    },
    {
      label:"Cruise Ship",
      value:"5"
    },
    {
      label:"Others",
      value:"0"
    }
  ];
  travelModeOptions = [
    {
      label:"Weekend Break",
      value:"1"
    },
    {
      label:"Package Holiday",
      value:"2"
    },
    {
      label:"Business Travel",
      value:"3"
    },
    {
      label:"Group Tour",
      value:"4"
    },
    {
      label:"Road Trip",
      value:"5"
    },
    {
      label:"Volunteer Travel",
      value:"6"
    },
    {
      label:"Long Term Travel",
      value:"7"
    },
    {
      label:"Student Travel",
      value:"8"
    },
    {
      label:"Visiting Friends or Relatives",
      value:"9"
    },
    {
      label:"Event Travel",
      value:"10"
    },
    {
      label:"Others",
      value:"0"
    }
  ];
  countryOptions = [];
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private tourSrv : TourService) {
    this.refreshCountries();
    this.getAllTours();
    this.countryOptions = COUNTRIES.map(item => {
      return {
        label: item.name,
        value: item.id,
        flag : item.flag
      };
    });
  }
  getAllTours(){
    this.tourSrv.getAllTours().subscribe(
      (res) => {
        console.log(res);
        this.allTours = res['data'];
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getOptionsDisplay(arr,value){
    let res = arr.filter(function(item){
      return item.value == value;
    });
    console.log(res);
    return res.length > 0 ? res[0].label : 'NA';
  }
  getCountryFlag(id){
    let res = this.countryOptions.filter(function(item){
      return item.value == id;
    });
    console.log(res[0]);
    return res[0]?.flag ? res[0].flag : '';
  }
  refreshCountries() {
    this.countries = COUNTRIES.map((country, i) => ({
      id: i + 1,
      ...country,
    })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }
  ngOnInit() {}
  onClickView() {}
  onClickEdit() {
    this.router.navigate(['edit', '7884']);
  }
}
