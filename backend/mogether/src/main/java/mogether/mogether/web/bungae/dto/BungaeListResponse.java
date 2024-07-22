package mogether.mogether.web.bungae.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mogether.mogether.domain.Address;
import mogether.mogether.domain.Keyword;
import mogether.mogether.domain.bungae.Bungae;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BungaeListResponse {

    private Long id;
    private List<String> imageUrls;
    private Long hostId;
    private String hostName;
    private String hostProfileImageUrl;
    private List<String> participantsImageUrls;//
    private Long participantsCount;//

//    private String thumbnail; //썸네일
    private String title;
    private String content;
    private Keyword keyword; ////
    private Address address;
    private Long interestsCount;
    private Date createdAt;
    private Date expireAt;

    public static List<BungaeListResponse> toBungaeListResponse(List<Bungae> bunageList) {
        return bunageList.stream()
                .map(bungae -> new BungaeListResponse(
                        bungae.getId(),
                        new ArrayList<>(),
                        31L,
                        "hostName",
                        "hostPRofileImageUrl",
                        new ArrayList<String>(),
                        12L,
                        bungae.getTitle(),
                        bungae.getContent(),
                        bungae.getKeyword(),
                        bungae.getAddress(),
                        3L,
                        bungae.getCreatedAt(),
                        bungae.getExpireAt()))
                .collect(Collectors.toList());
    }
}