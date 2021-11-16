//zmienne globalne
$haslo="";      //zmienna która przechowa orginalne hasło
$haslo1="";     //zmienna która przechowa zakodowane hasło
$dlugosc =0;    //zmienna która przechowa długość hasła
$bledy=0;       //zmienna która przechowa ilość błędów
$kategoria="";  //zmienna która przechowa kategorie hasła
$wys="20px";    //zmienna przechowywująca wartość do css

//funkcja pobierająca odpowiednie hasła z xml po rozpoczęciu gry
function opszons(pobrane){
    $a=0;
    $(document).ready
    (
    function()
        {
        $.ajax
        (
            {
            type: "GET",
            url: "hasla.xml",
            dataType: "xml",
            success: function(xml)
                {
                    switch(pobrane) //switch wybierający hasła zależnie od klikniętego przycisku
                        {
                            case 0:
                                $a = $(xml).find("wlo").length; //liczenie ile jest haseł "danej kategorii"
                                $a = Math.floor(Math.random()*$a); //losowanie liczby
                                $haslo = $(xml).find("nazwa").eq($a).text(); //pobranie hasła o wylosowanym numerze
                                $kategoria="kuchnia włoska"; //przypisanie kategorii wartości
                            break;
                            case 1:
                                $a = $(xml).find("jap").length;
                                $a = Math.floor(Math.random()*$a)+5;
                                $haslo = $(xml).find("nazwa").eq($a).text();
                                $kategoria="kuchnia japońska";
                            break;
                            case 2:
                                $a = $(xml).find("fra").length;
                                $a = Math.floor(Math.random()*$a)+10;
                                $haslo = $(xml).find("nazwa").eq($a).text();
                                $kategoria="kuchnia francuska";
                            break;
                            case 3:
                                $a = $(xml).find("sam").length;
                                $a = Math.floor(Math.random()*$a)+15;
                                $haslo = $(xml).find("nazwa").eq($a).text();
                                $kategoria="samochody osobowe";
                            break;
                            case 4:
                                $a = $(xml).find("moto").length;
                                $a = Math.floor(Math.random()*$a)+20;
                                $haslo = $(xml).find("nazwa").eq($a).text();
                                $kategoria="motocykle";
                            break;
                            case 5:
                                $a = $(xml).find("truck").length;
                                $a = Math.floor(Math.random()*$a)+25;
                                $haslo = $(xml).find("nazwa").eq($a).text();
                                $kategoria="samochody ciężarowe";
                            break;
                            case 6:
                                $a = $(xml).find("zima").length;
                                $a = Math.floor(Math.random()*$a)+30;
                                $haslo = $(xml).find("nazwa").eq($a).text();
                                $kategoria="sporty zimowe";
                            break;
                            case 7:
                                $a = $(xml).find("woda").length;
                                $a = Math.floor(Math.random()*$a)+35;
                                $haslo = $(xml).find("nazwa").eq($a).text();
                                $kategoria="sporty wodne";
                            break;
                            case 8:
                                $a = $(xml).find("ekst").length;
                                $a = Math.floor(Math.random()*$a)+40;
                                $haslo = $(xml).find("nazwa").eq($a).text();
                                $kategoria="sporty ekstremalne";
                            break;
                        }
                        $dlugosc = $haslo.length; //liczenie długości pobranego hasła
                        console.log($haslo) //wypisanie hasła w konsoli
                    for(i=0; i<$dlugosc;i++) //pętla tworząca zakodowane hasło
                    {
                     if($haslo.charAt(i)==" ") // warunek sprawdzający czy w haśle jest spacja
                        {
                           $haslo1 = $haslo1 + " ";
                        }
                    else
                        {
                           $haslo1 = $haslo1 + "_";
                        }
                    }
                        wypisz();   //wywołanie funkcji wypisującej kategorie i hasło
                        klawo();    //wywołanie funkcji "generującej" klawiature
                        $('#obrazek').html('<img src="obr/s0.jpg" alt="" />'); //wstawienie pierwszego obrazku
                        $('#licznik').html('<h5>Ilość błędów '+$bledy+'</h5><span class="reset" onclick= "location.reload()">Rezygnuję</span>'); //dodanie licznika błędów i spana do resetu strony
                        $('#licznik').css("padding",$wys); //css wybranych divów
                        $('#content').css("padding",$wys); //-||-
                        $('#pojemnik_na_reklame').css("background-color","lightgreen"); //usunięcie białego tła z reklamy
                }
            }
        );
        }
    );

}
function wypisz()
{
    $("#content").html("<h2>Kategoria: "+$kategoria+"</h2>"+"<h1>"+$haslo1+"</h1>"); //funkcja wypisująca kategorie i hasło
}

$literki = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż"; //deklaracja i definicja alfabetu
function klawo() // funkcja obsługująca proces powstawania klawiatury
{
    $alfabet_w_html="";

    for(i=0;i<35;i++)
    {
        $numer = "litera"+i;
        $alfabet_w_html = $alfabet_w_html + '<div class="litera" onclick="kliknieto('+i+')" id="'+$numer+'">'+$literki[i]+'</div>';

        if((i+1)%7==0)
        {
            $alfabet_w_html = $alfabet_w_html + '<div style="clear: both;"></div>';
        }
    }


    $("#klawiatura").html($alfabet_w_html);  //wypisanie utowrzonej klawiatury
}

function kliknieto(nr) //sprawdzanie klikniętych liter
{
    $spr = false; //deklaracja i definicja zmiennej służącej do określenia statusu klikniętej litery

    for(i=0;i<$dlugosc;i++) //sprawdzamy czy w zakodowanym haśle jest dana litera używając orginalnego hasła jeśli jest to wstawiamy ją i doklejamy reszte "stringa"
    {
        if($haslo.charAt(i) == $literki[nr])
        {
            $haslo1 = $haslo1.substr(0,i)+$literki[nr]+$haslo1.substr(i+1);
            $spr = true;
        }
    }
    if($spr==true) //jeśli sprawdzona liczba okazała sie prawdziwa to następuje zmiana cssa tej litery
    {
        $id = "#litera"+nr;
        $($id).css("background-color","green");
        $($id).css("cursor","not-allowed");

        wypisz()
    }
    else //jeśli sprawdzona liczba okazała sie fałszywa to następuje zmiana cssa tej litery oraz usunięcie jej wartości z onclicka przez co przycisk staje się nie aktywny
    {
        $id = "#litera"+nr;
        $($id).css("background-color","red");
        $($id).css("cursor","not-allowed");

        $($id).attr("onclick",";");
        $bledy++;

        $obraz = "obr/s"+$bledy+".jpg"
        $('#obrazek').html('<img src="' + $obraz + '" alt="" />'); //podmiana obrazu na następny z kolei

        $('#licznik').html('<h5>Ilość błędów '+$bledy+'</h5><span class="reset" onclick= "location.reload()">JESCZE RAZ?</span>'); //zmiana przycisku z rezygnacji na "jeszcze raz" po popełnieniu błędu
    }
    
    if($haslo1==$haslo) //sprawdzamy czy po dodaniu obecnie kliniętej litery dwa ciągi znaków są sobie jeśli tak to "kończy się gra"
    {
        $('#content').html("<h2>Hasło to: "+$haslo1+"</h2>"); //podstawienie hasła
        
        $('#licznik').html('<h5>Ilość błędów '+$bledy+'</h5>'); //wypisanie liczby popełnionych błędów
        if($bledy==0)
        {
            $('#klawiatura').html('<h2>Brawo wygrałeś!</h2><h3>Udowodniłeś wszystkim że potrafisz odgadnąć hasło nie popełniając ani jednego błędu</h3></br> <span class="reset" onclick= "location.reload()">JESCZE RAZ?</span>');
        }
        else
        {
            $('#klawiatura').html('<h2>Brawo wygrałeś!</h2><h3>Udowodniłeś wszystkim że potrafisz odgadnąć hasło</h3></br> <span class="reset" onclick= "location.reload()">JESCZE RAZ?</span>');
        }
    }
    if($bledy>=9) //sprawdzamy ilość błędów czy jest równa wartości kończącej gre
    {
        $('#content').html("<h2>Hasło to: "+$haslo+"</h2>");
        $('#klawiatura').html('<h2>Przegrałeś!</h2><h3>Ale nie przejmuj się, następnym razem na pewno sie uda!</h3><br><span class="reset" onclick= "location.reload()">JESCZE RAZ?</span>');
        $('#licznik').html('<h5>Ilość błędów '+$bledy+'</h5>');
        
    }
}